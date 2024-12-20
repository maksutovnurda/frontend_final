import axios from 'axios';
import { clearUser } from '../features/user/userSlice';
import store from '../store/store';

const axiosInstance = axios.create({
  baseURL: 'http://195.133.146.14:8090/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle expired/invalid tokens
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Dispatch the logout action
      store.dispatch(clearUser());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;