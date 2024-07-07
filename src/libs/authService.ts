import type { AuthProps } from '@/types';

import { ENDPOINTS } from '@/constants/apiUrl';

import axiosInstance from './axiosInstance';

export const signUp = async ({ email, password, name }: AuthProps) => {
  const response = await axiosInstance.post(ENDPOINTS.signUp, { email, password, name });
  return response.data;
};

export const login = async ({ email, password }: AuthProps) => {
  const response = await axiosInstance.post(ENDPOINTS.login, { email, password });
  return response.data;
};

// export const signUpWithProvider = async (name: string, token: string, redirectUrl: string, provider: Provider) => {
//   const url = replacePlaceholder(ENDPOINTS.signUpWithProvider, { provider });
//   const response = await axiosInstance.post(url, { name, token, redirectUrl });
//   return response.data;
// };

// export const signInWithProvider = async (token: string, redirectUrl: string, provider: Provider) => {
//   const url = replacePlaceholder(ENDPOINTS.signInWithProvider, { provider });
//   const response = await axiosInstance.post(url, { token, redirectUrl });
//   return response.data;
// };
