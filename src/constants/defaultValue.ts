import type { UserProps } from '@/types';

export const userDefault: UserProps = {
  id: 0,
  name: 'test_user',
  email: 'test@codeit.co.kr',
  imageSource: process.env.NEXT_PUBLIC_USER_ICON_URL || '',
  createdAt: '2024-07-08',
};
