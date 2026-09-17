// client/src/services/api.js
import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', headers: { 'Content-Type': 'application/json' } });
export const todoApi = {
  getAll: (params) => api.get('/todos', { params }),
  create: (todo) => api.post('/todos', todo),
  update: (id, todo) => api.put(`/todos/${id}`, todo),
  toggle: (id) => api.patch(`/todos/${id}/toggle`),
  remove: (id) => api.delete(`/todos/${id}`),
  removeCompleted: () => api.delete('/todos/completed')
};
export default api;
