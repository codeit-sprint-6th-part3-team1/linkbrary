// src/hooks/useFolders.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/recoil/state';
import useApiRequest from '@/hooks/useApiRequest';
import { HttpMethod } from '@/constants/apiUrl';

export interface FolderProps {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
}

const useFolders = () => {
  const accessToken = useRecoilValue(loginState);
  const [folders, setFolders] = useState<FolderProps[]>([]);
  const [message, setMessage] = useState<string>('');
  const { apiRequest, loading, error } = useApiRequest();

  const handleApiRequest = useCallback(
    async ({
      endpoint,
      method,
      body,
      onSuccessMessage,
      onFailureMessage,
      updateState,
    }: {
      endpoint: string;
      method: HttpMethod;
      body?: any;
      onSuccessMessage: string;
      onFailureMessage: string;
      updateState: (data: any) => void;
    }) => {
      if (!accessToken) {
        setMessage('Token error');
        return;
      }

      try {
        const data = await apiRequest({ endpoint, method, accessToken, body });
        updateState(data);
        setMessage(onSuccessMessage);
      } catch (err) {
        if (err instanceof Error) {
          setMessage(err.message);
        } else {
          setMessage(onFailureMessage);
        }
      }
    },
    [accessToken, apiRequest],
  );

  const getFolders = useCallback(() => {
    handleApiRequest({
      endpoint: '/folders',
      method: HttpMethod.GET,
      onSuccessMessage: '',
      onFailureMessage: 'Failed to fetch folders',
      updateState: (data) => setFolders(data),
    });
  }, [handleApiRequest]);

  const handleAddFolder = useCallback(
    (folderName: string) => {
      handleApiRequest({
        endpoint: '/folders',
        method: HttpMethod.POST,
        body: { name: folderName },
        onSuccessMessage: 'Folder added successfully',
        onFailureMessage: 'Failed to add folder',
        updateState: (newFolder) => setFolders((prevFolders) => [...prevFolders, newFolder]),
      });
    },
    [handleApiRequest],
  );

  const handleUpdateFolder = useCallback(
    (folderId: number, newName: string) => {
      handleApiRequest({
        endpoint: `/folders/${folderId}`,
        method: HttpMethod.PUT,
        body: { name: newName },
        onSuccessMessage: 'Folder updated successfully',
        onFailureMessage: 'Failed to update folder',
        updateState: (updatedFolder) =>
          setFolders((prevFolders) => prevFolders.map((folder) => (folder.id === folderId ? { ...folder, ...updatedFolder } : folder))),
      });
    },
    [handleApiRequest],
  );

  const handleFolderDetail = useCallback(
    (folderId: number) => {
      handleApiRequest({
        endpoint: `/folders/${folderId}`,
        method: HttpMethod.GET,
        onSuccessMessage: 'Folder details fetched successfully',
        onFailureMessage: 'Failed to fetch folder details',
        updateState: (data) => setFolders((prevFolders) => prevFolders.map((folder) => (folder.id === folderId ? { ...folder, ...data } : folder))),
      });
    },
    [handleApiRequest],
  );

  const handleDeleteFolder = useCallback(
    (folderId: number) => {
      handleApiRequest({
        endpoint: `/folders/${folderId}`,
        method: HttpMethod.DELETE,
        onSuccessMessage: 'Folder deleted successfully',
        onFailureMessage: 'Failed to delete folder',
        updateState: () => setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folderId)),
      });
    },
    [handleApiRequest],
  );

  useEffect(() => {
    if (accessToken) {
      getFolders();
    }
  }, [accessToken, getFolders]);

  return useMemo(
    () => ({
      folders,
      setFolders,
      message: error ? error.message : message,
      loading,
      handleAddFolder,
      handleUpdateFolder,
      handleFolderDetail,
      handleDeleteFolder,
    }),
    [folders, message, loading, handleAddFolder, handleUpdateFolder, handleFolderDetail, handleDeleteFolder, error],
  );
};

export default useFolders;
