import React from 'react';
import { useRouter } from 'next/router';
import Button from '../../components/components/Button/Button';
import styles from '../components/components/Button/Button.module.scss';

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
    // 폴더 추가 로직 구현
  };

  const handleShare = () => {
    console.log('공유 기능');
    // 공유 로직 구현
  };

  const handlePageNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <h1>버튼 테스트 페이지</h1>
      <Button variant="add-link-large" colorType="primary-gradient" text="링크 추가하기" onClick={handleAddLink} />
      <Button variant="add-link-small" colorType="primary-gradient" text="링크 추가하기" onClick={handleAddLink} />
      <Button variant="add-folder" colorType="primary" onClick={handleAddFolder}>
        폴더 추가 +
      </Button>
      <Button variant="share" colorType="primary" onClick={handleShare} />
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
