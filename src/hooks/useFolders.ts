import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/recoil/state';
import useApiRequest from '@/hooks/useApiRequest';
import { HttpMethod } from '@/constants/apiUrl';
import { checkAccessToken } from '@/utils/authUtils';
import { FolderProps } from '@/types';

const useFolders = () => {
  const accessToken = useRecoilValue(loginState);
  const { handleApiRequest, loading, error, message, setMessage } = useApiRequest();
  const [folders, setFolders] = useState<FolderProps[]>([]);

  const getFolders = useCallback(() => {
    const token = checkAccessToken(accessToken, setMessage);
    if (!token) return;

    handleApiRequest({
      endpoint: 'getAllFolders',
      method: HttpMethod.GET,
      accessToken: token,
      successMessage: '',
      failureMessage: 'Failed to fetch folders',
      updateState: (data) => setFolders(data),
    });
  }, [handleApiRequest, accessToken, setMessage]);

  const handleAddFolder = useCallback(
    (folderName: string) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint: 'createFolder',
        method: HttpMethod.POST,
        accessToken: token,
        body: { name: folderName },
        successMessage: 'Folder added successfully',
        failureMessage: 'Failed to add folder',
        updateState: (newFolder) => setFolders((prevFolders) => [...prevFolders, newFolder]),
      });
    },
    [handleApiRequest, accessToken, setMessage],
  );

  const handleUpdateFolder = useCallback(
    (folderId: number, name: string) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint: 'updateFolder',
        method: HttpMethod.PUT,
        accessToken: token,
        params: { folderId },
        body: { name },
        successMessage: 'Folder updated successfully',
        failureMessage: 'Failed to update folder',
        updateState: (updatedFolder) =>
          setFolders((prevFolders) => prevFolders.map((folder) => (folder.id === folderId ? { ...folder, ...updatedFolder } : folder))),
      });
    },
    [handleApiRequest, accessToken, setMessage],
  );

  const handleFolderDetail = useCallback(
    (folderId: number) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint: 'getFolder',
        method: HttpMethod.GET,
        accessToken: token,
        params: { folderId },
        successMessage: 'Folder details fetched successfully',
        failureMessage: 'Failed to fetch folder details',
        updateState: (data) => setFolders((prevFolders) => prevFolders.map((folder) => (folder.id === folderId ? { ...folder, ...data } : folder))),
      });
    },
    [handleApiRequest, accessToken, setMessage],
  );

  const handleDeleteFolder = useCallback(
    (folderId: number) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint: 'deleteFolder',
        method: HttpMethod.DELETE,
        accessToken: token,
        params: { folderId },
        successMessage: 'Folder deleted successfully',
        failureMessage: 'Failed to delete folder',
        updateState: () => setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folderId)),
      });
    },
    [handleApiRequest, accessToken, setMessage],
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
