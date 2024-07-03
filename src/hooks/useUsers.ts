import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/recoil/state';
import { HttpMethod, Endpoint } from '@/constants/apiUrl';
import { checkAccessToken } from '@/utils/authUtils';
import { UserProps } from '@/types';
import useApiRequest from '@/utils/apiUtilsAxios';

const useUsers = () => {
  const accessToken = useRecoilValue(loginState);
  const { handleApiRequest, loading, error, message, setMessage } = useApiRequest();
  const [user, setUser] = useState<UserProps | null>(null);

  const getUser = useCallback(() => {
    const token = checkAccessToken(accessToken, setMessage);
    if (!token) return;

    handleApiRequest({
      endpoint: 'getAllUsers' as Endpoint,
      method: HttpMethod.GET,
      accessToken: token,
      successMessage: 'User fetched successfully',
      failureMessage: 'Failed to fetch user',
      updateState: (data) => {
        if (data) {
          setUser(data);
        } else {
          console.error('Expected object but received:', data);
          setUser(null);
        }
      },
    });
  }, [handleApiRequest, accessToken, setMessage]);

  const checkEmail = useCallback(
    (email: string) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint: 'checkEmail' as Endpoint,
        method: HttpMethod.POST,
        accessToken: token,
        body: { email },
        successMessage: 'Email checked successfully',
        failureMessage: 'Failed to check email',
        updateState: (data) => {
          console.log('Email check result:', data);
        },
      });
    },
    [handleApiRequest, accessToken, setMessage],
  );

  return { user, getUser, checkEmail, loading, error, message };
};

export default useUsers;
