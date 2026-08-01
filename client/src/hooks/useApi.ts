import { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (apiCall: () => Promise<AxiosResponse<any>>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      setData(response.data.data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, request };
}
