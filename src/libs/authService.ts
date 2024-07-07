import type { AuthProps } from '@/types';

import { ENDPOINTS } from '@/constants/apiUrl';

import axiosInstance from './axiosInstance';

export const signUp = async ({ email, password, name }: AuthProps) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.signUp, { email, password, name });
    return response.data;
  } catch (error) {
    console.error('Sign Up Error: ', error);
    throw error;
  }
};

export const login = async ({ email, password }: AuthProps) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.login, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login Error: ', error);
    throw error;
  }
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
