import type { LinkProps, PagingOptions } from '@/types';

import { defaultPagingOptions, ENDPOINTS } from '@/constants';

import { addQueryParams, replacePlaceholder } from '@/utils/urlHelper';

import axiosInstance from './axiosInstance';

export const getLinksByFolder = async (folderId: string): Promise<LinkProps[]> => {
  const url = replacePlaceholder(ENDPOINTS.getLinksByFolder, { folderId });
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getAllLinks = async (options: PagingOptions = defaultPagingOptions): Promise<LinkProps[]> => {
  const { page, pageSize } = options;
  const url = replacePlaceholder(ENDPOINTS.getAllLinks, { page, pageSize });
  const response = await axiosInstance.get(url);
  return response.data;
};

export const addLink = async (url: string, folderId: number): Promise<LinkProps> => {
  const response = await axiosInstance.post(ENDPOINTS.addLink, { url, folderId });
  return response.data;
};

export const deleteLink = async (linkId: number) => {
  const url = replacePlaceholder(ENDPOINTS.deleteLink, { linkId });
  const response = await axiosInstance.delete(url);
  return response.data;
};

export const setFavoriteLink = async (linkId: number, favorite: boolean): Promise<LinkProps> => {
  const url = replacePlaceholder(ENDPOINTS.setFavoriteLink, { linkId });
  const response = await axiosInstance.put(url, { favorite });
  return response.data;
};

export const getFavorites = async (options: PagingOptions = defaultPagingOptions): Promise<LinkProps[]> => {
  const { page, pageSize } = options;
  const url = addQueryParams(ENDPOINTS.getFavorites, { page, pageSize });
  const response = await axiosInstance.get(url);
  return response.data;
};
