import { useState, useCallback } from 'react';
import { AuthProps } from '@/types';
import useApiRequest from '@/hooks/useApiRequest';
import { loginState } from '@/recoil/state';
import { useRecoilValue } from 'recoil';
import { HttpMethod } from '@/constants/apiUrl';

const useAuth = () => {
  const accessToken = useRecoilValue(loginState);
  const { handleApiRequest, loading, error, message } = useApiRequest();
  const [auth, setAuth] = useState<AuthProps | null>(null);

  const signUp = useCallback(
    (email: string, password: string, name: string) => {
      if (accessToken) {
        return handleApiRequest({
          endpoint: 'signUp',
          method: HttpMethod.POST,
          accessToken,
          body: { email, password, name },
          updateState: setAuth,
          successMessage: 'User created successfully',
          failureMessage: 'Failed to create user',
        });
      } else {
        return Promise.reject(new Error('No access token available'));
      }
    },
    [handleApiRequest, accessToken],
  );

  const signIn = useCallback(
    (email: string, password: string) => {
      if (accessToken) {
        return handleApiRequest({
          endpoint: 'login',
          method: HttpMethod.POST,
          accessToken,
          body: { email, password },
          successMessage: 'User signed in successfully',
          failureMessage: 'Failed to sign in',
          updateState: setAuth,
        });
      } else {
        return Promise.reject(new Error('No access token available'));
      }
    },
    [handleApiRequest, accessToken],
  );

  return { auth, setAuth, signUp, signIn, loading, error, message };
};

export default useAuth;
