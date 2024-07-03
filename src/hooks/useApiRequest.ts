import axios, { AxiosRequestConfig } from 'axios';
import { endpoints, Endpoint, HttpMethod } from '@/constants/apiUrl';
import { FetchApiProps } from '@/types';

export const getEndpoint = (endpoint: Endpoint, params?: Record<string, string | number>): string => {
  let url = `${process.env.NEXT_PUBLIC_API_ROOT_URL}${endpoints[endpoint]}`;
  if (params) {
    Object.keys(params).forEach((key) => {
      url = url.replace(`{${key}}`, params[key].toString());
    });
  }
  return url;
};

interface ApiRequestProps extends FetchApiProps {
  successMessage?: string;
  failureMessage?: string;
  updateState?: (data: any) => void;
}

export const makeApiRequest = async (
  { endpoint, method, accessToken, body, params, successMessage, failureMessage, updateState, folderId }: ApiRequestProps & { folderId?: number },
  setMessage: (message: string) => void,
) => {
  const url = getEndpoint(endpoint, params);
  const config: AxiosRequestConfig = {
    url: folderId ? url.replace('{folderId}', folderId.toString()) : url, // folderId 처리
    method,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (body && method !== HttpMethod.DELETE) {
    config.data = body;
  }
  try {
    const response = await axios(config);
    if (updateState) {
      updateState(response.status === 204 ? null : response.data);
    }
    if (successMessage) {
      setMessage(successMessage);
    }
    return { data: response.data };
  } catch (error) {
    console.error('API request failed:', error);
    if (failureMessage) {
      setMessage(failureMessage);
    }
    throw error;
  }
};
