import { useState } from 'react';
import { loginState, userState } from '@/recoil';

import { useRecoilState } from 'recoil';

import type { AuthProps } from '@/types';

import { login as loginApi } from '@/libs/authService';
import { getAllUsers } from '@/libs/userService';

import { userDefault } from '@/constants/defaultValue';

import { removeCookie, setCookie } from '@/utils/cookie';

const useLogin = () => {
  const [isLoggedIn, setLoginState] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const userData = await getAllUsers();
      setUserInfo(userData);
    } catch (error) {
      setUserInfo(userDefault);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async ({ email, password }: AuthProps) => {
    try {
      const token = await loginApi({ email, password });
      setCookie('accessToken', token);
      await fetchUsers();
      setLoginState(true);
      return true;
    } catch (error) {
      setLoginState(false);
      return false;
    }
  };

  const logout = () => {
    removeCookie('accessToken');
    setLoginState(false);
    setUserInfo(userDefault);
  };

  return { isLoggedIn, login, logout, isLoading, userInfo };
};

export default useLogin;
