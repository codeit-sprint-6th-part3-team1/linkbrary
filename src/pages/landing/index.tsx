import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import s from './landing.module.scss';
import Button from '../../components/Button/Button';
import Gnb from '@/components/Gnb';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  const router = useRouter();
  const isLoggedIn = false;

  const handleLinkClick = () => {
    if (isLoggedIn) {
      router.push('/share');
    } else {
      router.push('/login');
    }
  };

  return (
    <div>
      <main className={s.main}>
        <Gnb isLogin={isLoggedIn} />
        <div className={s.title}>
          <h1 className={s.maintext}>
            <span className={s.gradientmain}>세상의 모든 정보</span>를<br /> 쉽게 저장하고 관리해 보세요
          </h1>
          <Link href="/addlink">
            <Button variant="add-link" colorType="gradient" text="링크 추가하기" />
          </Link>
          <div className={s.titleimage} />
        </div>
        <div className={s.body}>
          <div className={s.section}>
            <div className={s.text}>
              <h2>
                <span className={s.gradient1}>원하는 링크</span>를<br /> 저장하세요
              </h2>
              <p>
                나중에 읽고 싶은 글, 다시 보고 싶은 영상,
                <br /> 사고 싶은 옷, 기억하고 싶은 모든 것을
                <br />한 공간에 저장하세요.
              </p>
            </div>
            <div className={s.image}>
              <img src="https://github.com/codeit-sprint-6th-part3-team1/linkbrary/assets/128791227/acc3e1d8-0737-4f2b-9c14-bde53eff9913" alt="저장 이미지" />
            </div>
          </div>
          <div className={s.section}>
            <div className={s.text}>
              <h2>
                링크를 폴더로
                <br />
                <span className={s.gradient2}>관리</span>하세요
              </h2>
              <p>
                나만의 폴더를 무제한으로 만들고
                <br />
                다양하게 활용할 수 있습니다.
              </p>
            </div>
            <div className={s.image}>
              <img src="https://github.com/codeit-sprint-6th-part3-team1/linkbrary/assets/128791227/c2eabacf-af2e-4145-ba06-066ebcb46240" alt="폴더 이미지" />
            </div>
          </div>
          <div className={s.section}>
            <div className={s.text}>
              <h2>
                저장한 링크를
                <br />
                <span className={s.gradient3}>공유</span>해 보세요
              </h2>
              <p>
                여러 링크를 폴더에 담고 공유할 수 있습니다.
                <br />
                가족, 친구, 동료들에게 쉽고 빠르게 링크를
                <br />
                공유해 보세요.
              </p>
            </div>
            <div className={s.image}>
              <img src="https://github.com/codeit-sprint-6th-part3-team1/linkbrary/assets/128791227/28be50ca-7382-46fc-b3e1-525c83fe4cd5" alt="공유 이미지" />
            </div>
          </div>
          <div className={s.section}>
            <div className={s.text}>
              <h2>
                저장한 링크를
                <br />
                <span className={s.gradient4}>검색</span>해 보세요
              </h2>
              <p>중요한 정보들을 검색으로 쉽게 찾아보세요.</p>
            </div>
            <div className={s.image}>
              <img src="https://github.com/codeit-sprint-6th-part3-team1/linkbrary/assets/128791227/8ac2ea83-0141-4c96-bdee-03ccaac8e910" alt="검색 이미지" />
            </div>
          </div>
        </div>
        <div className={s.footer}>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
