import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://195.133.146.14:8090/api/';

// Создаем экземпляр axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Инициализация состояния
const initialState = {
  user: null,
  token: Cookies.get('access_token') || null,
  refreshToken: Cookies.get('refresh_token') || null,
  status: 'idle',
  error: null,
};

// Регистрация пользователя
export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('signup/', userData); // Убедитесь, что эндпоинт корректен
    Cookies.set('access_token', response.data.access,  { expires: 1 });
    Cookies.set('refresh_token', response.data.refresh,  { expires: 1 });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Логин пользователя
export const loginUser = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('token/', credentials);
    Cookies.set('access_token', response.data.access, { expires: 1 });
    Cookies.set('refresh_token', response.data.refresh, { expires: 1 });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data || "Registration failed");
  }
});

// Обновление токена
export const refreshToken = createAsyncThunk('user/refreshToken', async (_, { getState, rejectWithValue }) => {
  const refresh = Cookies.get('refresh_token');
  try {
    const response = await axiosInstance.post('token/refresh/', { refresh });
    Cookies.set('access_token', response.data.access, { expires: 1 });
    return response.data;
  } catch (error) {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    return rejectWithValue(error.response.data || "Failed to refresh token");
  }
});

// Логика выхода из аккаунта
export const logout = createAsyncThunk('user/logout', async (_, { dispatch }) => {
  // Удаляем токены из Cookies
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  
  // Очищаем состояние пользователя через Redux
  dispatch(userSlice.actions.clearUser());
});

// Создаем userSlice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
  extraReducers: (builder) => {
    builder
    //register 
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.user = action.payload.username;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      }
      )
      //login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.user = action.payload.username;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      //refresh token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.access;
      })
      //logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.status = 'idle';
        state.error = null;
      })

      // Обработка ошибок
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      );
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
