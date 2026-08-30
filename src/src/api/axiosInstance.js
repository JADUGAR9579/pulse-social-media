import axios from 'axios';

/**
 * Pre-configured Axios instance.
 * Base URL is read from an env variable — swap for the real API in production.
 * All authenticated requests automatically get the Bearer token attached.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor — attach token ──────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('pulse_token') ||
      sessionStorage.getItem('pulse_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — handle 401 globally ──────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale tokens and let ProtectedRoute redirect to /login
      localStorage.removeItem('pulse_token');
      sessionStorage.removeItem('pulse_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
