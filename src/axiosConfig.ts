import axios from 'axios';

// Set the base URL for Axios using Vite's `import.meta.env`
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// If a JWT token is available, include it in the Authorization header
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
