import { useState, useCallback } from 'react';

const useApiCall = (accessToken: string | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleApiCall = useCallback(
    async (apiFunc: Function, successMessage: string, failureMessage: string, ...args: any[]) => {
      if (!accessToken) {
        setMessage('Token error');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await apiFunc(accessToken, ...args);
        setMessage(successMessage);
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        setError(error);
        setMessage(failureMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [accessToken],
  );

  return { handleApiCall, loading, error, message };
};

export default useApiCall;
