import React, { useState } from 'react';
import Image from 'next/image';

import Logo from '../../../public/assets/input/add-link.svg';

import styles from '@/components/AddLink/style.module.scss';

// Link 타입 정의
interface Link {
  id: number;
  url: string;
}

interface AddLinkProps {
  onAddLink: (newLink: Link) => void;
}

// AddLink 컴포넌트 정의
const AddLink: React.FC<AddLinkProps> = ({ onAddLink }) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAddLink = () => {
    const newLink: Link = { id: 0, url };
    
    onAddLink(newLink);
    setUrl('');
    setError('');

    onAddLink(newLink);
    setUrl('');
    setError('');
  };

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
          alt="AddLink logo"
          className={styles.logo}
        />
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="링크를 추가해 보세요"
          className={styles.input}
        />
        <button onClick={handleAddLink} className={styles.button}>추가하기</button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.linkList}>
        {links.map(link => (
          <li key={link.id} className={styles.linkItem}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {link.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddLink;
