import { useState, useCallback } from 'react';
import { HttpMethod } from '@/constants/apiUrl';

interface ApiRequestProps {
  endpoint: string;
  method: HttpMethod;
  accessToken: string;
  body?: any;
  params?: Record<string, string | number>;
  updateState: (data: any) => void;
  onSuccessMessage: (data: any) => string;
  onFailureMessage: (error: Error) => string;
}

export const buildUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  let url = `${process.env.NEXT_PUBLIC_API_ROOT_URL}${endpoint}`;
  if (params) {
    const queryParams = new URLSearchParams(params as Record<string, string>).toString();
    url = queryParams ? `${url}?${queryParams}` : url;
  }
  return url;
};

export const fetchApi = async ({
  url,
  method,
  accessToken,
  body,
}: Omit<ApiRequestProps, 'endpoint' | 'params' | 'updateState' | 'onSuccessMessage' | 'onFailureMessage'> & { url: string }) => {
  const res = await fetch(url, {
    method,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'API request failed');
  }

  const contentType = res.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  } else {
    return null;
  }
};

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleApiRequest = useCallback(
    async ({ endpoint, method, body, accessToken, params, updateState, onSuccessMessage, onFailureMessage }: ApiRequestProps) => {
      setLoading(true);
      setError(null);
      const url = buildUrl(endpoint, params);

      try {
        const data = await fetchApi({ url, method, accessToken, body });
        updateState(data);
        setError(null);
        return onSuccessMessage(data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        setError(error);
        return onFailureMessage(error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { handleApiRequest, loading, error };
};

export default useApiRequest;
