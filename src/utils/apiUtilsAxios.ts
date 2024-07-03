import { useState, useCallback } from 'react';
import { FetchApiProps } from '@/types';
import { makeApiRequest } from '@/hooks/useApiRequest';

interface ApiResponse {
  data?: any;
  error?: Error;
}

interface ApiRequestProps extends FetchApiProps {
  successMessage?: string;
  failureMessage?: string;
  updateState?: (data: any) => void;
  folderId?: number;
}

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleApiRequest = useCallback(async (props: ApiRequestProps): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);

    try {
      const data = await makeApiRequest(props, setMessage);
      return { data };
    } catch (err) {
      const error = err as Error;
      setError(error);
      return { error };
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleApiRequest, loading, error, message, setMessage };
};

export default useApiRequest;
