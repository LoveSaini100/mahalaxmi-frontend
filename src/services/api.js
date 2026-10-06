import axios from 'axios';

const getApiBaseUrl = () => {
  let envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    envUrl = envUrl.trim().replace(/\/$/, '');
    if (!envUrl.endsWith('/api')) {
      envUrl = `${envUrl}/api`;
    }
    return envUrl;
  }
  return '/api';
};

const API = axios.create({
  timeout: 3500,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Construct full API URL & Attach JWT Token
API.interceptors.request.use(
  (config) => {
    const apiBase = getApiBaseUrl();
    if (config.url && !config.url.startsWith('http://') && !config.url.startsWith('https://')) {
      const path = config.url.startsWith('/') ? config.url : `/${config.url}`;
      config.url = `${apiBase}${path}`;
    }

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

// Response Interceptor: Format errors gracefully & detect invalid HTML responses
API.interceptors.response.use(
  (response) => {
    // Detect if static server returned HTML (index.html fallback) instead of JSON from API
    if (
      typeof response.data === 'string' &&
      (response.data.trim().startsWith('<!DOCTYPE') ||
        response.data.trim().startsWith('<!doctype') ||
        response.data.trim().startsWith('<html'))
    ) {
      return Promise.reject(
        new Error(
          'API server returned an HTML webpage instead of JSON. Ensure your live backend is running and VITE_API_URL is configured to your backend URL.'
        )
      );
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('mahalaxmi_admin_token');
    }
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please check your connection.';
    return Promise.reject(new Error(message));
  }
);

export const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('data:')
  ) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  const apiBaseUrl = getApiBaseUrl();
  const baseUrl = apiBaseUrl.replace(/\/api\/?$/, '');
  return baseUrl ? `${baseUrl}${cleanPath}` : cleanPath;
};

export default API;
