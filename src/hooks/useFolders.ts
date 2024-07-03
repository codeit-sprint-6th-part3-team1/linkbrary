import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/recoil/state';

import { HttpMethod, Endpoint } from '@/constants/apiUrl';
import { checkAccessToken } from '@/utils/authUtils';
import { FolderProps } from '@/types';
import useApiRequest from '@/utils/apiUtilsAxios';

const useFolders = () => {
  const accessToken = useRecoilValue(loginState);
  const { handleApiRequest, loading, error, message, setMessage } = useApiRequest();
  const [folders, setFolders] = useState<FolderProps[]>([]);

  const apiHandler = useCallback(
    (
      endpoint: Endpoint,
      method: HttpMethod,
      params?: Record<string, string | number>,
      body?: any,
      successMessage?: string,
      failureMessage?: string,
      updateState?: (data: any) => void,
    ) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint,
        method,
        accessToken: token,
        params,
        body,
        successMessage,
        failureMessage,
        updateState,
      });
    },
    [accessToken, handleApiRequest, setMessage],
  );

  const getFolders = useCallback(() => {
    apiHandler('getAllFolders', HttpMethod.GET, undefined, undefined, '', 'Failed to fetch folders', (data) => setFolders(data));
  }, [apiHandler]);

  const handleAddFolder = useCallback(
    (folderName: string) => {
      apiHandler('createFolder', HttpMethod.POST, undefined, { name: folderName }, 'Folder added successfully', 'Failed to add folder', (newFolder) =>
        setFolders((prevFolders) => [...prevFolders, newFolder]),
      );
    },
    [apiHandler],
  );

  const handleUpdateFolder = useCallback(
    (folderId: number, name: string) => {
      apiHandler('updateFolder', HttpMethod.PUT, { folderId }, { name }, 'Folder updated successfully', 'Failed to update folder', (updatedFolder) =>
        setFolders((prevFolders) => prevFolders.map((folder) => (folder.id === folderId ? { ...folder, ...updatedFolder } : folder))),
      );
    },
    [apiHandler],
  );

  const handleDeleteFolder = useCallback(
    (folderId: number) => {
      apiHandler('deleteFolder', HttpMethod.DELETE, { folderId }, undefined, 'Folder deleted successfully', 'Failed to delete folder', () =>
        setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folderId)),
      );
    },
    [apiHandler],
  );

  useEffect(() => {
    if (accessToken) {
      getFolders();
    }
  }, [accessToken, getFolders]);

  return {
    folders,
    loading,
    message: error ? error.message : message,
    handleAddFolder,
    handleUpdateFolder,
    handleDeleteFolder,
  };
};

export default useFolders;
