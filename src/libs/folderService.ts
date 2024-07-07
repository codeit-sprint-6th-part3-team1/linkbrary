import type { FolderProps } from '@/types';

import { ENDPOINTS } from '@/constants/apiUrl';

import { replacePlaceholder } from '@/utils/urlHelper';

import axiosInstance from './axiosInstance';

export const getAllFolders = async () => {
  const response = await axiosInstance.get(ENDPOINTS.getAllFolders);
  return response.data;
};

export const createFolder = async (name: string): Promise<FolderProps> => {
  const response = await axiosInstance.post(ENDPOINTS.createFolder, { name });
  return response.data;
};

export const getFolder = async (folderId: number): Promise<FolderProps> => {
  const url = replacePlaceholder(ENDPOINTS.getFolder, { folderId });
  const response = await axiosInstance.get(url);
  return response.data;
};

export const deleteFolder = async (folderId: number) => {
  const url = replacePlaceholder(ENDPOINTS.deleteFolder, { folderId });
  const response = await axiosInstance.delete(url);
  return response.data;
};

export const updateFolder = async (folderId: number, name: string): Promise<FolderProps> => {
  const url = replacePlaceholder(ENDPOINTS.updateFolder, { folderId });
  const response = await axiosInstance.put(url, { name });
  return response.data;
};
