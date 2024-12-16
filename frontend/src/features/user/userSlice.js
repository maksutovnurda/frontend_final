import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://195.133.146.14:8090/api/';

// Создаем экземпляр axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Инициализация состояния
const initialState = {
  user: null,
  token: localStorage.getItem('access_token') || null,
  refreshToken: localStorage.getItem('refresh_token') || null,
  status: 'idle',
  error: null,
};

// Регистрация пользователя
export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('signup/', userData); // Убедитесь, что эндпоинт корректен
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Логин пользователя
export const loginUser = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('token/', credentials);
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Обновление токена
export const refreshToken = createAsyncThunk('user/refreshToken', async (_, { getState, rejectWithValue }) => {
  const refresh = getState().user.refreshToken;
  try {
    const response = await axiosInstance.post('token/refresh/', { refresh });
    localStorage.setItem('access_token', response.data.access);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Создаем userSlice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.user = action.payload.username;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.user = action.payload.username;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.access;
      })
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

export const { logout } = userSlice.actions;
export default userSlice.reducer;
