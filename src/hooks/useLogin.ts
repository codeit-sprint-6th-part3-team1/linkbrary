// useLogin.ts
import { loginState } from '@/recoil/loginState';
import { userState } from '@/recoil/state';

import { useRecoilState } from 'recoil';

import type { AuthProps } from '@/types';

import { login as loginApi } from '@/libs/authService';
import { getAllUsers } from '@/libs/userService';

import { userDefault } from '@/constants/defaultValue';

import { getCookie, removeCookie, setCookie } from '@/utils/cookie';

const useLogin = () => {
  const [isLoggedIn, setLoginState] = useRecoilState(loginState);
  const [, setUserInfo] = useRecoilState(userState);

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setUserInfo(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const login = async ({ email, password }: AuthProps) => {
    try {
      const token = await loginApi({ email, password });
      setCookie('accessToken', token);
      setLoginState(true);
      fetchUsers();
      return true;
    } catch (error) {
      setLoginState(false);
      return false;
    }
  };

  const logout = () => {
    removeCookie('accessToken');
    setLoginState(false);
    setUserInfo([userDefault]);
  };

  const checkLoginStatus = () => {
    const accessToken = getCookie('accessToken');
    setLoginState(!!accessToken);
  };

  return { isLoggedIn, login, logout, checkLoginStatus };
};

export default useLogin;
