/* eslint-disable @typescript-eslint/no-shadow */
import type { LinkProps, PagingOptions } from '@/types';

import { getAllLinks, getFavorites, getLinksByFolder } from '@/libs/linkService';

import { defaultPagingOptions } from '@/constants';

type GetAllLinks = (_options?: PagingOptions) => Promise<LinkProps[]>;
type GetFavorite = (_options?: PagingOptions) => Promise<LinkProps[]>;
type GetLinksByFolder = (folderId: string) => Promise<LinkProps[]>;

interface LinkFunctions {
  getAllLinks: GetAllLinks;
  getFavorites: GetFavorite;
  getLinksByFolder: GetLinksByFolder;
}

const linkFunctions: LinkFunctions = {
  getAllLinks,
  getFavorites,
  getLinksByFolder,
};

const getLinks = (folderId: string, { getAllLinks, getFavorites, getLinksByFolder }: LinkFunctions): ((options?: PagingOptions) => Promise<LinkProps[]>) => {
  if (folderId === 'all') {
    return (options: PagingOptions = defaultPagingOptions) => getAllLinks(options);
  }
  if (folderId === 'favorite') {
    return (options: PagingOptions = defaultPagingOptions) => getFavorites(options);
  }
  return () => getLinksByFolder(folderId);
};

export const fetchLinks = async (folderId: string, options?: PagingOptions): Promise<LinkProps[]> => {
  const linksFetcher = getLinks(folderId, linkFunctions);
  return linksFetcher(options);
};
