import React from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Button/Button';
import styles from '@/components/Button/Button.module.scss';

const ButtonTest: React.FC = () => {
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
      {/*링크추가 버튼*/}
      <Button variant="add-link" colorType="gradient" text="링크 추가하기" width="" onClick={handleAddLink} />

      {/*폴더추가 버튼*/}
      <Button variant="add-folder" colorType="primary" text="폴더 추가 +" width="" onClick={handleAddFolder} />

      {/*공유 버튼*/}
      <Button variant="share" colorType="primary" onClick={handleShare} />

      {/*전체 버튼*/}
      <Button variant="all-large" colorType="primary" text="전체" width="" onClick={() => handlePageNavigation('/all')} />
      <Button variant="all-large" colorType="white" text="전체" onClick={() => handlePageNavigation('/all')} />
      <Button variant="all-large" colorType="gray-200" text="전체" onClick={() => handlePageNavigation('/all')} />
      <Button variant="all-small" colorType="primary" text="전체" onClick={() => handlePageNavigation('/all')} />
      <Button variant="all-small" colorType="white" text="전체" onClick={() => handlePageNavigation('/all')} />
      <Button variant="all-small" colorType="gray-200" text="전체" onClick={() => handlePageNavigation('/all')} />
    </div>
  );
};

export default ButtonTest;
