import axios from 'axios';
import { BASE_URL } from './apiPath';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Only redirect to login if we're on a protected page.
        const publicPaths = ['/', '/main', '/login', '/signup'];
        const currentPath = window.location.pathname;
        if (!publicPaths.includes(currentPath)) {
          window.location.href = '/login';
        }
      } else if (error.response.status === 500) {
        console.error('Server Error. Please Try Again Later');
      } else if (error.code === 'ECONNABORTED') {
        console.error('Request Timeout. Please try again later');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
