export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const endpoints = {
  // AUTH
  signUp: `${API_BASE_URL}/auth/sign-up`,
  signIn: `${API_BASE_URL}/auth/sign-in`,

  //FOLDER

  // LINK
  links: `${API_BASE_URL}/links`,

  //OAUTH

  //USER
  user: `${API_BASE_URL}/user`,
};
export type endpoint = keyof typeof endpoints;

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
export type CustomInputType = keyof typeof HttpMethod;
