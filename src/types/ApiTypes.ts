import type { ENDPOINT, HttpMethod } from '@/constants';

export interface ApiProps {
  endpoint: ENDPOINT;
  method: HttpMethod;
  accessToken: string;
  body?: any;
  params?: Record<string, string | number>;
}

export interface PagingOptions {
  page?: number;
  pageSize?: number;
}
