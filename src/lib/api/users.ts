import { HttpMethod } from '@/constants/apiUrl';
import { fetchApi, buildUrl } from '@/hooks/useApiRequest';
import { UserProps } from '@/types';

export const getUserListApi = async (accessToken: string, page: number, pageSize: number): Promise<UserProps[]> => {
  const url = buildUrl('/users', { page, pageSize });
  return await fetchApi({ url, method: HttpMethod.GET, accessToken });
};

export const getUser = async (accessToken: string) => {
  const url = buildUrl(`/users`);
  return await fetchApi({ url, method: HttpMethod.GET, accessToken });
};

export const checkUserEmail = async (accessToken: string, email: string) => {
  const url = buildUrl('/user/check-email');
  return await fetchApi({ url, method: HttpMethod.POST, accessToken, body: { email } });
};
