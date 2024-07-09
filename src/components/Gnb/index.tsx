import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import useLogin from '@/hooks/useLogin';
import useWindowSize from '@/hooks/useWindowSize';

import { DeviceType } from '@/constants/deviceSizes';

import Button from '@/components/Button/Button';

import MainLogo from '../../../public/assets/gnb/MainLogo';
import ProfileIcon from '../../../public/assets/gnb/ProfileIcon';

import s from './style.module.scss';

interface GnbProps {
  isLogin: boolean;
  userEmail?: string;
}

function UserProfile({ isLogin, userEmail }: { isLogin: boolean; userEmail: string }) {
  const { logout } = useLogin();
  if (!isLogin) {
    return (
      <Link href="/login">
        <Button variant="login" colorType="gradient" text="로그인" />
      </Link>
    );
  }
  return (
    <div className={s.userSection}>
      <div className={s.UserProfile}>
        <ProfileIcon />
        <p className={s.email}>{userEmail}</p>
        <button type="button" onClick={logout}>
          logout
        </button>
      </div>
    </div>
  );
}

export default function Gnb({ isLogin = false, userEmail = 'test@codeit.co.kr' }: GnbProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const deviceType: DeviceType = useWindowSize();
  const logoSize = (deviceType === DeviceType.MOBILE && { width: 88.67, height: 16 }) || { width: 133, height: 24 };

  if (!isMounted) {
    return null; // 초기 렌더링 시 서버와 클라이언트가 일치하도록 빈 UI 반환
  }

  return (
    <header className={s.gnb}>
      <Link href="/">
        <MainLogo width={logoSize.width} height={logoSize.height} />
      </Link>

      <UserProfile isLogin={isLogin} userEmail={userEmail} />
    </header>
  );
}
