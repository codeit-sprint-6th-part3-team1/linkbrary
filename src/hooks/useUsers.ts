import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/recoil/state';
import useApiRequest from '@/hooks/useApiRequest';
import { HttpMethod, Endpoint } from '@/constants/apiUrl';
import { checkAccessToken } from '@/utils/authUtils';
import { UserProps } from '@/types';

const useUsers = () => {
  const accessToken = useRecoilValue(loginState);
  const { handleApiRequest, loading, error, message, setMessage } = useApiRequest();
  const [users, setUsers] = useState<UserProps[]>([]);

  const getUserList = useCallback(
    (page: number, pageSize: number) => {
      const token = checkAccessToken(accessToken, setMessage);
      if (!token) return;

      handleApiRequest({
        endpoint: 'getAllUsers' as Endpoint,
        method: HttpMethod.GET,
        accessToken: token,
        params: { page, pageSize },
        successMessage: 'Users fetched successfully',
        failureMessage: 'Failed to fetch users',
        updateState: (data) => {
          if (Array.isArray(data)) {
            setUsers(data);
          } else {
            console.error('Expected array but received:', data);
            setUsers([]);
          }
        },
      });
    },
    [handleApiRequest, accessToken, setMessage],
  );

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

  return { users, getUserList, checkEmail, loading, error, message };
};

export default useUsers;
