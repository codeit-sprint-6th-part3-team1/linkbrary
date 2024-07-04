import React from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button/Button';
import s from '@/components/Button/Button.module.scss';
import ShareIcon from '../../../public/assets/Button/ShareIcon';
import PlusIcon from '../../../public/assets/Button/PlusIcon';

const Home: React.FC = () => {
  const router = useRouter();
  const isLoggedIn = false; // 로그인 상태 체크 (임시로 false 설정)

  const handleAddLink = () => {
    if (isLoggedIn) {
      router.push('/share');
    } else {
      router.push('/login');
    }
  };

  const handleAddFolder = () => {
    console.log('폴더 추가 기능');
  };

  const handleShare = () => {
    console.log('공유 기능');
  };

  const handlePageNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={s.container}>
      <h1>버튼 테스트 페이지</h1>
      <Button variant="add-link" colorType="gradient" text="링크 추가하기" onClick={handleAddLink} />
      <Button variant="add-folder" colorType="primary" onClick={handleAddFolder}>
        폴더 추가
        <PlusIcon />
      </Button>
      <Button variant="share" colorType="primary" onClick={() => handlePageNavigation('/all')}>
        <ShareIcon />
      </Button>
      <Button variant="all-large" colorType="primary" onClick={() => handlePageNavigation('/all')}>
        전체
      </Button>
      <Button variant="all-large" colorType="gray-200" onClick={() => handlePageNavigation('/all')}>
        전체
      </Button>
      <Button variant="all-large" colorType="white" onClick={() => handlePageNavigation('/all')}>
        전체
      </Button>
      <Button variant="all-small" colorType="primary" onClick={() => handlePageNavigation('/all')}>
        전체
      </Button>
      <Button variant="all-small" colorType="gray-200" onClick={() => handlePageNavigation('/all')}>
        전체
      </Button>
      <Button variant="all-small" colorType="white" onClick={() => handlePageNavigation('/all')}>
        전체
      </Button>
    </div>
  );
};

export default Home;
