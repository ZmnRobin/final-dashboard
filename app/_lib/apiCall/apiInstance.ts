import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { backend_url } from '../utils/const';
import { getTokenFromCookies } from '../utils/utilityFunction';

interface ApiInstance extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<any>;
}

// Create a new Axios instance
const api: ApiInstance = axios.create({
  baseURL: backend_url,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

