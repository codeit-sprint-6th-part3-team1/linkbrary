import type { UserProps } from '@/types';

import { ENDPOINTS } from '@/constants';

import axiosInstance from './axiosInstance';

export const getAllUsers = async (): Promise<UserProps> => {
  const res = await axiosInstance.get(ENDPOINTS.getAllUsers);
  return res.data;
};

export const checkDuplicateEmail = async (email: string) => axiosInstance.post(ENDPOINTS.checkDuplicateEmail, { email });
