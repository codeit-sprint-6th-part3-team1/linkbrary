import { useState, useCallback } from 'react';
import { getUserListApi } from '@/lib/api/users';
import { UserProps } from '@/types';
import useApiCall from '@/hooks/useApiCall';

const useUsers = (accessToken: string | null) => {
  const { handleApiCall, loading, error, message } = useApiCall(accessToken);
  const [users, setUsers] = useState<UserProps[]>([]);

  const getUserList = useCallback(
    (page: number, pageSize: number) =>
      handleApiCall(getUserListApi, 'Users fetched successfully', 'Failed to fetch users', page, pageSize).then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Expected array but received:', data);
          setUsers([]);
        }
      }),
    [handleApiCall],
  );

  return { users, getUserList, loading, error, message };
};

export default useUsers;
