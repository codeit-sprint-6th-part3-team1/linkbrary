import { HttpMethod } from '@/constants/apiUrl';
import { fetchApi, buildUrl } from '@/hooks/useApiRequest';

export const getFoldersApi = async (accessToken: string) => {
  const url = buildUrl('/folders');
  return await fetchApi({ url, method: HttpMethod.GET, accessToken });
};

export const addFolderApi = async (accessToken: string, folderName: string) => {
  const url = buildUrl('/folders');
  return await fetchApi({ url, method: HttpMethod.POST, accessToken, body: { name: folderName } });
};

export const updateFolderApi = async (accessToken: string, folderId: number, newName: string) => {
  const url = buildUrl(`/folders/${folderId}`);
  return await fetchApi({ url, method: HttpMethod.PUT, accessToken, body: { name: newName } });
};

export const getFolderDetailApi = async (accessToken: string, folderId: number) => {
  const url = buildUrl(`/folders/${folderId}`);
  return await fetchApi({ url, method: HttpMethod.GET, accessToken });
};

export const deleteFolderApi = async (accessToken: string, folderId: number) => {
  const url = buildUrl(`/folders/${folderId}`);
  return await fetchApi({ url, method: HttpMethod.DELETE, accessToken });
};
