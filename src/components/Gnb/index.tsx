import MainIcon from './assets/MainLogo';
//import ProfileIcon from './assets/ProfileIcon';

import ProfileIcon from '@public/assets copy/ProfileIcon';
import s from './style.module.scss';

interface GnbProps {
  isLogin: boolean;
  userIcon?: string;
  userEmail?: string;
}

// TODO : Change the component name
const RightBtn = ({ isLogin = false, userIcon, userEmail = 'test@codeit.co.kr' }: GnbProps) => {
  if (!isLogin) {
    return (
      <>
        <input type="button"></input>
      </>
    );
  }
  return (
    <div className={s.btn}>
      <ProfileIcon width={19} />
      <div className={s.email}>{userEmail}</div>
    </div>
  );
};

export default function Gnb() {
  return (
    <div className={s.gnb}>
      <div className={s.container}>
        <div className={s.logo}>
          <MainIcon />
        </div>
        <RightBtn isLogin />
      </div>
    </div>
  );
}
