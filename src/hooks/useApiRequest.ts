// src/hooks/useApiRequest.ts
import { useState, useCallback } from 'react';
import { HttpMethod } from '@/constants/apiUrl';

interface ApiRequestProps {
  endpoint: string;
  method: HttpMethod;
  accessToken: string;
  body?: any;
  params?: Record<string, string | number>;
}

const buildUrl = (endpoint: string, params?: Record<string, string | number>) => {
  let url = `${process.env.NEXT_PUBLIC_API_ROOT_URL}${endpoint}`;

  if (params) {
    const queryParams = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    url = queryParams ? `${url}?${queryParams}` : url;
  }

  return url;
};

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const apiRequest = useCallback(async ({ endpoint, method, accessToken, body, params }: ApiRequestProps) => {
    setLoading(true);
    setError(null);

    try {
      const url = buildUrl(endpoint, params);

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
        throw new Error(errorData.message);
      }

      const contentType = res.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        return data;
      } else {
        return null;
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unknown error occurred'));
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { apiRequest, loading, error };
};

export default useApiRequest;
