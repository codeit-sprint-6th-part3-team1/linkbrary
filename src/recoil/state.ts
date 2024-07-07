import { atom } from 'recoil';

import type { FolderProps, LinkProps, UserProps } from '@/types';

import { userDefault } from '@/constants/defaultValue';

export const linkListState = atom<LinkProps[]>({
  key: 'linkListState',
  default: [],
});

export const folderListState = atom<FolderProps[]>({
  key: 'folderListState',
  default: [],
});

export const userState = atom<UserProps[]>({
  key: 'userState',
  default: [userDefault],
});
