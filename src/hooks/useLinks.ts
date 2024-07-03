import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/recoil/state';
import { HttpMethod, Endpoint } from '@/constants/apiUrl';
import { checkAccessToken } from '@/utils/authUtils';
import { LinkProps } from '@/types';
import useApiRequest from '@/utils/apiUtilsAxios';

const useLinks = () => {
  const accessToken = useRecoilValue(loginState);
  const { handleApiRequest, loading, error, message, setMessage } = useApiRequest();
  const [links, setLinks] = useState<LinkProps[]>([]);

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
        successMessage: successMessage ?? '',
        failureMessage: failureMessage ?? '',
        updateState: updateState ?? (() => {}),
      });
    },
    [accessToken, handleApiRequest, setMessage],
  );

  const getLinksByFolder = useCallback(
    (folderId: number, page: number, pageSize: number) => {
      apiHandler(
        'getLinksByFolder' as Endpoint,
        HttpMethod.GET,
        { folderId, page, pageSize },
        undefined,
        'Links fetched successfully',
        'Failed to fetch links',
        setLinks,
      );
    },
    [apiHandler],
  );

  const getAllLinks = useCallback(() => {
    apiHandler('getAllLinks' as Endpoint, HttpMethod.GET, undefined, undefined, 'All links fetched successfully', 'Failed to fetch links', setLinks);
  }, [apiHandler]);

  const addLink = useCallback(
    (linkData: { url: string; folderId: number }) => {
      apiHandler('addLink' as Endpoint, HttpMethod.POST, undefined, linkData, 'Link added successfully', 'Failed to add link', (newLink) =>
        setLinks((prevLinks) => [...prevLinks, newLink]),
      );
    },
    [apiHandler],
  );

  const deleteLink = useCallback(
    (linkId: number) => {
      apiHandler('deleteLink' as Endpoint, HttpMethod.DELETE, { linkId }, undefined, 'Link deleted successfully', 'Failed to delete link', () =>
        setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId)),
      );
    },
    [apiHandler],
  );

  const updateLink = useCallback(
    (linkId: number, linkData: { url?: string; description?: string; favorite?: boolean }) => {
      apiHandler('updateLink' as Endpoint, HttpMethod.PUT, { linkId }, linkData, 'Link updated successfully', 'Failed to update link', (updatedLink) =>
        setLinks((prevLinks) => prevLinks.map((link) => (link.id === linkId ? { ...link, ...updatedLink } : link))),
      );
    },
    [apiHandler],
  );

  const setFavoriteLink = useCallback(
    (linkId: number, favorite: boolean) => {
      apiHandler(
        'setFavoriteLink' as Endpoint,
        HttpMethod.PUT,
        { linkId },
        { favorite },
        'Link set as favorite successfully',
        'Failed to set link as favorite',
        (updatedLink) => {
          if (updatedLink || favorite === false) {
            setLinks((prevLinks) => prevLinks.map((link) => (link.id === linkId ? { ...link, favorite } : link)));
          }
        },
      );
    },
    [apiHandler],
  );

  const getFavorites = useCallback(
    (page: number, pageSize: number) => {
      apiHandler(
        'getFavorites' as Endpoint,
        HttpMethod.GET,
        { page, pageSize },
        undefined,
        'Favorites fetched successfully',
        'Failed to fetch favorites',
        (data) => setLinks(data.map((link: LinkProps) => ({ ...link, favorite: link.favorite ?? false }))),
      );
    },
    [apiHandler],
  );

  return { links, setLinks, getLinksByFolder, getAllLinks, addLink, deleteLink, updateLink, setFavoriteLink, getFavorites, loading, error, message };
};

export default useLinks;
