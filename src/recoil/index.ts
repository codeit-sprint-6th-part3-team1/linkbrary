import { atom } from 'recoil';

import type { currentFolder, FolderProps, LinkProps, UserProps } from '@/types';

import { userDefault } from '@/constants/defaultValue';

import { getCookie } from '@/utils';

export const linkListState = atom<LinkProps[]>({
  key: 'linkListState',
  default: [],
});

export const folderListState = atom<FolderProps[]>({
  key: 'folderListState',
  default: [],
});

export const userState = atom<UserProps>({
  key: 'userState',
  default: userDefault,
});

export const loginState = atom<boolean>({
  key: 'loginState',
  default: !!getCookie('accessToken'),
});

export const currentFolderState = atom<currentFolder>({
  key: 'currentFolderState',
  default: {
    id: 'all',
    name: '전체',
    linkCount: 0,
  },
});

export const fetchMsgState = atom<string>({
  key: 'fetchMsg',
  default: '',
});
