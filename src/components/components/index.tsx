import React from 'react';
import Button from 'Button';

const TestPage: React.FC = () => {
  const handleButtonClick = () => {
    alert('click!');
  };

  return (
    <div>
      <h1>Test Page</h1>

      {/*링크추가 버튼*/}
      <Button variant="add-link-large" colorType="skyblue" onClick={handleButtonClick}>
        링크 추가하기 (Large)
      </Button>
      <Button variant="add-link-small" colorType="skyblue" onClick={handleButtonClick}>
        링크 추가하기 (Small)
      </Button>

      {/*폴더추가 버튼*/}
      <Button variant="add-folder" colorType="primary" onClick={handleButtonClick}>
        폴더 추가
        <img src="" alt="+ Icon" />
      </Button>

      {/*공유 버튼*/}
      <Button variant="share" colorType="primary" onClick={handleButtonClick}>
        <img src="share-icon.png" alt="Share Icon" />
      </Button>

      {/*전체 버튼*/}
      <Button variant="all-large" colorType="gray-200" onClick={handleButtonClick}>
        전체 (Large)
      </Button>
      <Button variant="all-small" colorType="gray-200" onClick={handleButtonClick}>
        전체 (Small)
      </Button>
      <Button variant="all-large" colorType="primary" onClick={handleButtonClick}>
        전체 (Large)
      </Button>
      <Button variant="all-small" colorType="primary" onClick={handleButtonClick}>
        전체 (Small)
      </Button>
      <Button variant="all-large" colorType="skyblue" onClick={handleButtonClick}>
        전체 (Large)
      </Button>
      <Button variant="all-small" colorType="skyblue" onClick={handleButtonClick}>
        전체 (Small)
      </Button>
    </div>
  );
};

export default TestPage;
