import { useState, useCallback } from 'react';
import { getLinksByFolderApi, getAllLinksApi, addLinkApi, deleteLinkApi, updateLinkApi, getFavoritesApi } from '@/lib/api/links';
import { LinkProps } from '@/types';
import useApiCall from '@/hooks/useApiCall';

const useLinks = (accessToken: string | null) => {
  const { handleApiCall, loading, error, message } = useApiCall(accessToken);
  const [links, setLinks] = useState<LinkProps[]>([]);

  const getLinksByFolder = useCallback(
    (folderId: number, page: number, pageSize: number) =>
      handleApiCall(getLinksByFolderApi, 'Links fetched successfully', 'Failed to fetch links', folderId, page, pageSize).then(setLinks),
    [handleApiCall],
  );

  const getAllLinks = useCallback(
    (page: number, pageSize: number, search?: string) =>
      handleApiCall(getAllLinksApi, 'All links fetched successfully', 'Failed to fetch links', page, pageSize, search).then(setLinks),
    [handleApiCall],
  );

  const addLink = useCallback(
    (linkData: { url: string; description: string; folderId: number }) =>
      handleApiCall(addLinkApi, 'Link added successfully', 'Failed to add link', linkData).then((newLink) => {
        setLinks((prevLinks) => [...prevLinks, newLink]);
      }),
    [handleApiCall],
  );

  const deleteLink = useCallback(
    (linkId: number) =>
      handleApiCall(deleteLinkApi, 'Link deleted successfully', 'Failed to delete link', linkId).then(() =>
        setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId)),
      ),
    [handleApiCall],
  );

  const updateLink = useCallback(
    (linkId: number, linkData: { url?: string; description?: string; favorite?: boolean }) =>
      handleApiCall(updateLinkApi, 'Link updated successfully', 'Failed to update link', linkId, linkData).then((updatedLink) => {
        setLinks((prevLinks) => prevLinks.map((link) => (link.id === linkId ? { ...link, ...updatedLink } : link)));
      }),
    [handleApiCall],
  );

  const getFavorites = useCallback(
    (page: number, pageSize: number) =>
      handleApiCall(getFavoritesApi, 'Favorites fetched successfully', 'Failed to fetch favorites', page, pageSize).then((data) => {
        setLinks(data.map((link: LinkProps) => ({ ...link, favorite: link.favorite ?? false })));
      }),
    [handleApiCall],
  );

  return { links, setLinks, getLinksByFolder, getAllLinks, addLink, deleteLink, updateLink, getFavorites, loading, error, message };
};

export default useLinks;
