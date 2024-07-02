import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/recoil/state';
import { HttpMethod, endpoints, Endpoint } from '@/constants/apiUrl';
import { checkAccessToken } from '@/utils/authUtils';
import useApiRequest from '@/hooks/useApiRequest';
import { LinkProps } from '@/types';

const useLinks = () => {
  const accessToken = useRecoilValue(loginState);
  const { handleApiRequest, loading, error, message, setMessage } = useApiRequest();
  const [links, setLinks] = useState<LinkProps[]>([]);

  const getLinksByFolder = useCallback(
    (folderId: number, page: number, pageSize: number) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint: 'getLinksByFolder' as Endpoint,
        method: HttpMethod.GET,
        accessToken: token,
        params: { folderId, page, pageSize },
        successMessage: 'Links fetched successfully',
        failureMessage: 'Failed to fetch links',
        updateState: setLinks,
      });
    },
    [handleApiRequest, accessToken, setMessage],
  );

  const getAllLinks = useCallback(
    (page: number, pageSize: number, search?: string) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      const params: Record<string, string | number> = { page, pageSize };
      if (search) {
        params.search = search;
      }

      handleApiRequest({
        endpoint: 'getAllLinks' as Endpoint,
        method: HttpMethod.GET,
        accessToken: token,
        params,
        successMessage: 'All links fetched successfully',
        failureMessage: 'Failed to fetch links',
        updateState: setLinks,
      });
    },
    [handleApiRequest, accessToken, setMessage],
  );

  const addLink = useCallback(
    (linkData: { url: string; folderId: number }) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint: 'addLink',
        method: HttpMethod.POST,
        accessToken: token,
        body: linkData,
        successMessage: 'Link added successfully',
        failureMessage: 'Failed to add link',
        updateState: (newLink) => setLinks((prevLinks) => [...prevLinks, newLink]),
      });
    },
    [handleApiRequest, accessToken, setMessage],
  );

  const deleteLink = useCallback(
    (linkId: number) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint: 'deleteLink' as Endpoint,
        method: HttpMethod.DELETE,
        accessToken: token,
        params: { linkId },
        successMessage: 'Link deleted successfully',
        failureMessage: 'Failed to delete link',
        updateState: () => setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId)),
      });
    },
    [handleApiRequest, accessToken, setMessage],
  );

  const updateLink = useCallback(
    (linkId: number, linkData: { url?: string; description?: string; favorite?: boolean }) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint: 'updateLink' as Endpoint,
        method: HttpMethod.PUT,
        accessToken: token,
        body: { ...linkData, linkId },
        successMessage: 'Link updated successfully',
        failureMessage: 'Failed to update link',
        updateState: (updatedLink) => setLinks((prevLinks) => prevLinks.map((link) => (link.id === linkId ? { ...link, ...updatedLink } : link))),
      });
    },
    [handleApiRequest, accessToken, setMessage],
  );

  const setFavoriteLink = useCallback(
    (linkId: number) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint: 'setFavoriteLink' as Endpoint,
        method: HttpMethod.POST,
        accessToken: token,
        params: { linkId },
        successMessage: 'Link set as favorite successfully',
        failureMessage: 'Failed to set link as favorite',
        updateState: (updatedLink) => setLinks((prevLinks) => prevLinks.map((link) => (link.id === linkId ? { ...link, ...updatedLink } : link))),
      });
    },
    [handleApiRequest, accessToken, setMessage],
  );

  const getFavorites = useCallback(
    (page: number, pageSize: number) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint: 'getFavorites' as Endpoint,
        method: HttpMethod.GET,
        accessToken: token,
        params: { page, pageSize },
        successMessage: 'Favorites fetched successfully',
        failureMessage: 'Failed to fetch favorites',
        updateState: (data) => {
          setLinks(data.map((link: LinkProps) => ({ ...link, favorite: link.favorite ?? false })));
        },
      });
    },
    [handleApiRequest, accessToken, setMessage],
  );

  return { links, setLinks, getLinksByFolder, getAllLinks, addLink, deleteLink, updateLink, setFavoriteLink, getFavorites, loading, error, message };
};

export default useLinks;
