import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';

import Logo from '@public/assets/input/SearchIcon.svg';

import styles from '@/components/SearchBar/style.module.scss';

// SearchBar 타입 정의
interface Search {
  id: number;
  url: string;
}
interface SearchBarProps {
  onSearch: (query: string) => void;
}

// SearchBar 컴포넌트 정의
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setUrl(event.target.value);
    if (error) setError('');
    onSearch(query);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Image src={Logo} width={20} height={20} alt="Search icon" className={styles.icon} />
        <input type="text" value={url} onChange={handleInputChange} placeholder="링크를 검색해 보세요." className={styles.input} />
      </div>
    </div>
  );
};

export default SearchBar;
