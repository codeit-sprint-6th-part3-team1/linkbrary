import { atom, selector } from 'recoil';

// Atom === state?
// 어떤 컴포넌트에서나 읽고 쓸 수 있으며, atom 값을 읽는다는 것은 atom을 구독하고 있다는 것.
// 때문에 atom에 어떤 변화가 있으면 그 atom을 구독하고 있는 모든 컴포넌트가 다시 렌더링된다.
// redux랑 똑같넹

// type accessToken = string;

// export const loginState = atom<accessToken>({
//   key: 'loginState', // unique ID
//   default: '', // default value
// });

// 말 진짜 어렵게 써놨네
// 원래 상태를 가지고 특정 계산(변환과정)을 통해 새로운 값(공식문서에서는 파생된 상태)을 만들어냄.
// 으음 함수
// export const charCountState = selector({
//   key: 'charCountState',
//   get: ({ get }) => {
//     const text = get(loginState);
//     return text.length;
//   },
// });

// NOTE 발표할 때 recoil을 선택한 이유에 대해서도 설명해야 하는데, selector를 사용하는 것이 무슨 이점이 있지?
// 좀더 소규모 프로젝트에 적합하다>? 사실상 상태값의 수가 매우 적고, 그마저도 추가적인 계산이 필요없기 때문에 의미가 있는건지 모르겠어

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
