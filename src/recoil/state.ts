import { atom } from 'recoil';

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      if (typeof window !== 'undefined') {
        if (isReset) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
      }
    });
  };

export const loginState = atom<string | null>({
  key: 'loginState',
  default: null,
  effects_UNSTABLE: [localStorageEffect('loginState')],
});
