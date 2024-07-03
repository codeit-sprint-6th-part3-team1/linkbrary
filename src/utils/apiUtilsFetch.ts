import { endpoints, Endpoint } from '@/constants/apiUrl';

export const getEndpoint = (endpoint: Endpoint, params?: Record<string, string | number>): string => {
  let url = `${process.env.NEXT_PUBLIC_API_ROOT_URL}${endpoints[endpoint]}`;
  if (params) {
    Object.keys(params).forEach((key) => {
      url = url.replace(`{${key}}`, params[key].toString());
    });
  }
  return url;
};

interface FetchApiProps {
  url: string;
  method: string;
  accessToken: string;
  body?: any;
}

export const fetchApi = async ({ url, method, accessToken, body }: FetchApiProps) => {
  const options: RequestInit = {
    method,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (body && method !== 'DELETE') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    let errorMessage = 'API request failed';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (error) {
      console.error('Error parsing error response:', error);
    }
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return null;
};
