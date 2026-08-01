import { apiClient } from '../lib/axios';

export const eventService = {
  getEvents: async (params?: Record<string, any>) => {
    const response = await apiClient.get('/events', { params });
    return response.data;
  },
  getEventBySlug: async (slug: string) => {
    const response = await apiClient.get(`/events/${slug}`);
    return response.data;
  },
  createEvent: async (payload: Record<string, any>) => {
    const response = await apiClient.post('/events', payload);
    return response.data;
  },
};
