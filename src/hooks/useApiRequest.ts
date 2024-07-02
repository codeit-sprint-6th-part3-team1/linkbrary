import { useState, useCallback } from 'react';
import { HttpMethod, Endpoint } from '@/constants/apiUrl';
import { getEndpoint, fetchApi } from '@/utils/apiUtilsAxios';

interface ApiRequestProps {
  endpoint: Endpoint;
  method: HttpMethod;
  accessToken: string;
  body?: any;
  params?: Record<string, string | number>;
  updateState: (data: any) => void;
  successMessage: string;
  failureMessage: string;
}

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleApiRequest = useCallback(
    async ({ endpoint, method, body, accessToken, params, updateState, successMessage, failureMessage }: ApiRequestProps) => {
      if (!accessToken) {
        setMessage('Token error');
        return;
      }

      setLoading(true);
      setError(null);
      setMessage('');

      try {
        const url = getEndpoint(endpoint, params);

        const data = await fetchApi({ url, method, accessToken, body });
        updateState(data);
        setMessage(successMessage);
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        setError(error);
        setMessage(error.message || failureMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setMessage],
  );

  return { handleApiRequest, loading, error, message, setMessage };
};

export default useApiRequest;
