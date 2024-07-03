import { useState } from 'react';
import styles from '@/components/SearchBar/style.module.scss';
import Image from 'next/image';
import searchIcon from '../../../public/assets/input/search.svg';
interface SearchProps {
  onUrlChange: (url: string) => void;
}

const SearchBar = ({ onUrlChange }: SearchProps) => {
  const [url, setUrl] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setUrl(text);
    onUrlChange(text);
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.iconBox}>
        <Image src={searchIcon} width={16} height={16} alt="Search icon" className={styles.icon} />
      </div>
      <input type="text" value={url} onChange={handleInputChange} placeholder="링크를 검색해 보세요." className={styles.input} />
    </div>
  );
};

export default SearchBar;
