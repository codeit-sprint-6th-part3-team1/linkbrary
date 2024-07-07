// TODO cookie 라이브러리 next.js 로 변경
import Cookies from 'universal-cookie';

const cookie = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => cookie.set(name, value, { ...options });

export const getCookie = (name: string) => cookie.get(name);

export const removeCookie = (name: string) => cookie.remove(name, { path: '/' });
