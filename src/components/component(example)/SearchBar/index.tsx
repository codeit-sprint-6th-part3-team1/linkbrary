import React, { useState, ChangeEvent } from 'react';
import styles from '@/components/component(example)/SearchBar/style.module.scss';
import Image from 'next/image';
import Logo from '@public/search.svg';

//SearchBar 타입 정의
interface Search {
  id: number;
  url: string;
}

//SearchBar 컴포넌트 정의
const SearchBar: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    if (error) setError('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Image 
          src={Logo}
          width={20}
          height={20}
          alt="Search icon"
          className={styles.icon}
        />
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="링크를 검색해 보세요."
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default SearchBar;
