import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/recoil/state';
import useUsers from '@/hooks/useUsers';
import UserList from '@/components/UserList';

const Page = () => {
  const accessToken = useRecoilValue(loginState) as string | null;
  const { users, getUserList, loading, error } = useUsers(accessToken);

  useEffect(() => {
    if (accessToken) {
      console.log('Fetching user list');
      getUserList(1, 10); // 페이지와 페이지 크기를 설정하여 유저 리스트 가져오기
    }
  }, [accessToken, getUserList]);

  const handleUserClick = (userId: number) => {
    console.log('User clicked:', userId);
  };

  return (
    <div>
      {loading && <p>Loading users...</p>}
      {error && <p>Error: {error.message}</p>}
      <UserList users={users} onUserClick={handleUserClick} />
    </div>
  );
};

export default Page;
