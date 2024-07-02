import axios, { AxiosRequestConfig } from 'axios';
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
  const config: AxiosRequestConfig = {
    url,
    method,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (body && method !== 'DELETE') {
    config.data = body;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    let errorMessage = 'API request failed';

    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data;
      errorMessage = errorData.message || errorMessage;
    } else {
      console.error('Error making API request:', error);
    }

    throw new Error(errorMessage);
  }
};
