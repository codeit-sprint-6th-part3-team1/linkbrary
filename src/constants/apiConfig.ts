import type { PagingOptions } from '@/types';

export const ENDPOINTS = {
  // AUTH
  signUp: '/auth/sign-up',
  login: '/auth/sign-in',
  signUpWithProvider: '/auth/sign-up/{provider}',
  signInWithProvider: '/auth/sign-in/{provider}',

  // FOLDER
  getAllFolders: '/folders',
  createFolder: '/folders',
  getFolder: '/folders/{folderId}',
  deleteFolder: '/folders/{folderId}',
  updateFolder: '/folders/{folderId}',

  // LINK
  getLinksByFolder: '/folders/{folderId}/links',
  getAllLinks: '/links?page={page}&pageSize={pageSize}',
  addLink: '/links',
  deleteLink: '/links/{linkId}',
  setFavoriteLink: '/links/{linkId}',
  getFavorites: '/favorites',

  // OAUTH
  setOauthApps: '/oauthApps',

  // USER
  getAllUsers: '/users',
  checkDuplicateEmail: '/users/check-email',
};
export type ENDPOINT = keyof typeof ENDPOINTS;

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export const defaultPagingOptions: PagingOptions = { page: 1, pageSize: 10 };
