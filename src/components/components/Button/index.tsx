import React from 'react';
import Button from '@/components/components/Button/Button';

const TestPage: React.FC = () => {
  const handleButtonClick = () => {
    alert('click!');
  };

  const handleAddLink = () => {
    console.log('링크 추가 기능');
    // 링크 추가 로직 구현
  };

  return (
    <div>
      <h1>Test Page</h1>

      {/*링크추가 버튼*/}

      <Button variant="add-link-large" colorType="primary-gradient" onClick={handleButtonClick}>
        링크 추가하기
      </Button>

      <Button variant="add-link-small" colorType="primary-gradient" onClick={handleButtonClick}>
        링크 추가하기
      </Button>

      {/*폴더추가 버튼*/}

      <Button variant="add-folder" colorType="primary" onClick={handleButtonClick}>
        폴더 추가 +
      </Button>

      {/*공유 버튼*/}

      <Button variant="share" colorType="primary" onClick={handleButtonClick} />

      {/*전체 버튼*/}

      <Button variant="all-large" colorType="gray-200" onClick={handleButtonClick}>
        전체
      </Button>

      <Button variant="all-small" colorType="gray-200" onClick={handleButtonClick}>
        전체
      </Button>

      <Button variant="all-large" colorType="primary" onClick={handleButtonClick}>
        전체
      </Button>

      <Button variant="all-small" colorType="primary" onClick={handleButtonClick}>
        전체
      </Button>

      <Button variant="all-large" colorType="white" onClick={handleButtonClick}>
        전체
      </Button>

      <Button variant="all-small" colorType="white" onClick={handleButtonClick}>
        전체
      </Button>
    </div>
  );
};

export default TestPage;
