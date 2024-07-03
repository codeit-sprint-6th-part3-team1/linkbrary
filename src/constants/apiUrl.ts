export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const endpoints = {
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
  getAllLinks: '/links',
  addLink: '/links',
  deleteLink: '/links/{linkId}',
  setFavoriteLink: '/links/{linkId}',
  getFavorites: '/favorites',

  // OAUTH
  setOauthApps: '/oauthApps',

  // USER
  getAllUsers: '/users',
  checkEmail: '/users/check-email',
};
export type Endpoint = keyof typeof endpoints;

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
