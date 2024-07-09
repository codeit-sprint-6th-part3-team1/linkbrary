import React from 'react';
import Image from 'next/image';

import Logo from '../../../public/assets/input/add-link.svg';

import styles from './style.module.scss';

interface AddLinkFormProps {
  url: string;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddLink: (e: React.FormEvent<HTMLFormElement>) => void;
}

// AddLink 컴포넌트 정의
const AddLinkForm = ({ url, onUrlChange, handleAddLink }: AddLinkFormProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLink(e);
    }
  };
  return (
    <div className={styles.addLink}>
      <form onSubmit={handleAddLink} onKeyDown={handleKeyDown}>
        <Image src={Logo} width={20} height={20} alt="AddLink logo" className={styles.logo} />
        <input name="url" type="text" value={url} onChange={onUrlChange} placeholder="링크를 추가해 보세요" required />
        <button type="submit">추가하기</button>
      </form>
    </div>
  );
};

export default AddLinkForm;
