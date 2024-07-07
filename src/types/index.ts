import type { ENDPOINT, HttpMethod } from '@/constants/apiUrl';

export interface FolderProps {
  id: number;
  name: string;
  linkCount?: number;
  createdAt: string;
}

export interface LinkProps {
  id: number;
  url: string;
  title: string;
  description: string;
  createdAt?: string;
  favorite: boolean;
  imageSource: string;
  folderId?: number;
}

export interface UserProps {
  id: number;
  name: string;
  email: string;
  // imageSource: string; // 현재 제공되지 않는 요소
  createdAt: string;
}

export interface CardProps {
  title: string;
  description: string;
  imageSource: string;
  url: string;
  favorite: boolean;
  createdAt: string;
}

export type Provider = 'google' | 'kakao';
export interface AuthProps {
  name?: string;
  email: string;
  password: string;
  provider?: Provider;
}

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
