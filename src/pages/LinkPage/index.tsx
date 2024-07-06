import React, { useState } from 'react';
import Gnb from '@/components/Gnb';
import Footer from '@/components/Footer';
import AddLink from '@/components/AddLink';
import SearchBar from '@/components/SearchBar';
import Card from '@/components/Card';
import PlusIcon from '@public/assets/Button/PlusIcon';
import ShareIcon from '@public/assets/Button/ShareIcon';
import NewNameIcon from '@public/assets/Button/NewNameIcon';
import DeleteIcon from '@public/assets/Button/DeleteIcon';
import styles from '@/pages/LinkPage/style.module.scss';
import Link from 'next/link';

interface Link {
  id: number;
  url: string;
}

interface Card {
  content: string;
  updatedAt: string;
  createdAt: string;
}


const LinkPage: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [title, setTitle] = useState<string>();

  const changeTitle = (newTitle: string) => {
    setTitle(newTitle);
  }; // 제목 변경 로직 

  const handleAddFolder = () => {
    // 폴더 추가 로직
  };

  const handleFolderTypes = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTitle =  event.currentTarget.textContent || 'Default Heading';
    changeTitle(newTitle);
    // 폴더 종류 로직
  }

  const handleAddLink = (newLink: Link) => {
    setLinks((prevLink) => ({...prevLink, newLink}));
  }; // 링크 추가 로직


  const handleSearch = (query: string) => {
    setSearchQuery(query);
  }; // 검색바 로직

  const handleFavorite = (index: number) => {
    // 즐겨찾기 추가&삭제 로직
  };

  const handleEditLink = (index: number) => {
    // 링크 수정 로직
  };

  const handleDeleteLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleShare = () => {
    // 공유 버튼
    console.log('공유 기능');
  };

  const handleRename = () => {
    // 이름 변경 버튼
    console.log('이름 변경');
  };

  const handleDelete = () => {
    // 삭제 버튼
    console.log('삭제 버튼');
  };


  return (
    <div className={styles.linkPage}>
      <header className={styles.header}>
        <Gnb isLogin={true} />
        <div className={styles.container}>
          < AddLink onAddLink={handleAddLink} /> 
        </div>
      </header>
      <div className={styles.content}>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.buttonContainer}>
        <button className={styles.FolderTypes} onClick={handleFolderTypes}>전체</button>
        <button className={styles.FolderTypes} onClick={handleFolderTypes}>다이어트</button>
        <button className={styles.FolderTypes} onClick={handleFolderTypes}>코딩 참고용</button>
        <button className={styles.FolderTypes} onClick={handleFolderTypes}>채용 사이트</button>
        <button className={styles.FolderTypes} onClick={handleFolderTypes}>내 모음집</button>
        <button className={styles.addFolderButton}  onClick={handleAddFolder}>
          폴더 추가<PlusIcon />
        </button>
      </div>
          
      <div className={styles.middleContainer}>   
        <h2>{title}</h2>
          <button className={styles.button} onClick={handleShare}>
            <Link href="https://www.instagram.com/">
              <ShareIcon />
            </Link>
          </button>
          <button className={styles.button} onClick={handleRename}>
            <NewNameIcon />
          </button>
          <button className={styles.button} onClick={handleDelete}>
            <DeleteIcon  />
          </button> 
      </div>

      <div className={styles.cardContainer}>  
        <Card 
          content={'string'}
          updatedAt={'string'}
          createdAt={'string'}
        />
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default LinkPage;
