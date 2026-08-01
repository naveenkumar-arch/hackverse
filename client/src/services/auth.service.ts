import { apiClient } from '../lib/axios';

export const authService = {
  login: async (credentials: Record<string, string>) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  register: async (payload: Record<string, string>) => {
    const response = await apiClient.post('/auth/register', payload);
    return response.data;
  },
  getProfile: async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },
};
