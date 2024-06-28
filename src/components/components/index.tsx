import React from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/components/Button/Button';
//import Navbar from ''';
//import Footer from '';

const Home: React.FC = () => {
  const router = useRouter();
  const isLoggedIn = false; // 로그인 상태 체크 (임시로 false 설정)

  const handleLinkClick = () => {
    if (isLoggedIn) {
      router.push('/share');
    } else {
      router.push('/login');
    }
  };

  return (
    <div>
      <main>
        <header>
          <h1>세상의 모든 정보를 쉽게 저장하고 관리해 보세요</h1>
          <Button variant="add-link-large" colorType="primary-gradient" onClick={handleLinkClick}>
            링크 추가하기
          </Button>
        </header>
        <body>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </body>
        <footer></footer>
        {/* 추가적인 섹션들 */}
      </main>
    </div>
  );
};

export default Home;
