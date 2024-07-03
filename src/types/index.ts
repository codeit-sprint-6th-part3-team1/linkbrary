import { Endpoint, HttpMethod } from '@/constants/apiUrl';

export interface FolderProps {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
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
  imageSource: string;
  createdAt: string;
}

export type provider = 'google' | 'kakao';

export interface AuthProps {
  name: string;
  email: string;
  password: string;
  provider: provider;
}

export interface FetchApiProps {
  endpoint: Endpoint;
  method: HttpMethod;
  accessToken: string | null;
  body?: any;
  params?: Record<string, string | number>;
}
