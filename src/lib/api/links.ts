import { HttpMethod } from '@/constants/apiUrl';
import { fetchApi, buildUrl } from '@/hooks/useApiRequest';

export const getLinksByFolderApi = async (accessToken: string, folderId: number, page: number, pageSize: number) => {
  const url = buildUrl(`/folders/${folderId}/links`, { page, pageSize });
  return await fetchApi({ url, method: HttpMethod.GET, accessToken });
};

export const getAllLinksApi = async (accessToken: string, page: number, pageSize: number, search?: string) => {
  const queryParams: { page: number; pageSize: number; search?: string } = { page, pageSize };
  if (search) {
    queryParams.search = search;
  }
  const url = buildUrl(`/links`, queryParams);
  return await fetchApi({ url, method: HttpMethod.GET, accessToken });
};

export const addLinkApi = async (accessToken: string, linkData: { url: string; folderId: number }) => {
  const url = buildUrl(`/links`);
  return await fetchApi({ url, method: HttpMethod.POST, accessToken, body: linkData });
};

export const deleteLinkApi = async (accessToken: string, linkId: number) => {
  const url = buildUrl(`/links/${linkId}`);
  return await fetchApi({ url, method: HttpMethod.DELETE, accessToken });
};

export const updateLinkApi = async (accessToken: string, linkId: number, linkData: { url?: string; description?: string; favorite?: boolean }) => {
  const url = buildUrl(`/links/${linkId}`);
  return await fetchApi({ url, method: HttpMethod.PUT, accessToken, body: linkData });
};

export const getFavoritesApi = async (accessToken: string, page: number, pageSize: number) => {
  const url = buildUrl(`/favorites`, { page, pageSize });
  return await fetchApi({ url, method: HttpMethod.GET, accessToken });
};
