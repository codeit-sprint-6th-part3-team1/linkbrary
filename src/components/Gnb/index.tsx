import React from 'react';
import MainLogo from '../../../public/assets/gnb/MainLogo';
import ProfileIcon from '../../../public/assets/gnb/ProfileIcon';
import useWindowSize from '@/hooks/useWindowSize';
import { DeviceType } from '@/constants/deviceSizes';
import s from './style.module.scss';
import Link from 'next/link';

interface GnbProps {
  isLogin: boolean;
  userIcon?: string;
  userEmail?: string;
}

export default function Gnb({ isLogin = false, userIcon = '', userEmail = 'test@codeit.co.kr' }: GnbProps) {
  const deviceType: DeviceType = useWindowSize();
  const logoSize = (deviceType === DeviceType.MOBILE && { width: 88.67, height: 16 }) || { width: 133, height: 24 };

  // NOTE_ASK : UserProfile 컴포넌트를 별도로 분리할 필요가 있을까???
  const UserProfile = ({ isLogin }: { isLogin: boolean }) => {
    if (!isLogin) {
      //FIXME : 로그인 버튼 교환 필요
      return <button className={s.loginButton}>Login</button>;
    }
    return (
      <div className={s.userSection}>
        {/* FIXME : 즐겨찾기 버튼 교환 필요 */}
        <Link href="http://www.naver.com">
          <button>⭐ 즐겨찾기</button>
        </Link>
        <div className={s.UserProfile}>
          <ProfileIcon />
          <p className={s.email}>{userEmail}</p>{' '}
        </div>
      </div>
    );
  };

  return (
    <header className={s.gnb}>
      <MainLogo width={logoSize.width} height={logoSize.height} />
      <UserProfile isLogin={isLogin} />
    </header>
  );
}
