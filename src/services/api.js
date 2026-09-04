import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('mahalaxmi_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Format errors gracefully
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('mahalaxmi_admin_token');
    }
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  const apiBaseUrl = import.meta.env.VITE_API_URL || '';
  const baseUrl = apiBaseUrl.replace(/\/api\/?$/, '');
  return baseUrl ? `${baseUrl}${cleanPath}` : cleanPath;
};

export default API;
