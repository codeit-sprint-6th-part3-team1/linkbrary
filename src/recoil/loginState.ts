import { atom, selector } from 'recoil';

import { getCookie } from '@/utils/cookie';

export const loginState = atom<boolean>({
  key: 'loginState',
  default: !!getCookie('accessToken'),
});
