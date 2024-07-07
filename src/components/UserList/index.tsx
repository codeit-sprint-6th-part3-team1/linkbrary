import type { UserProps } from '@/types';

interface UserListProps {
  users: UserProps[];
  onUserClick: (userId: number) => void;
}

function UserList({ users, onUserClick }: UserListProps) {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} onClick={() => onUserClick(user.id)}>
              {user.name} ({user.email})
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
}

export default UserList;
