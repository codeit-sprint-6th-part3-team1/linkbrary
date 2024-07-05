import { useState } from 'react';
import styles from './style.module.scss';
<<<<<<< HEAD
import MeatBallsIcon from './MeatBallsIcon';
import CardImageNull from './CardImageNull';
import CardStarFalse from './CardStarFalseIcon';
import CardStarTrue from './CardStarTrueIcon';
import CardSettingList from './CardSettingList';
import Image from 'next/image';

// Props interface로 타입 정의
interface CardProps {
  imageUrl?: string;
  upDatedAt: string;
  content: string;
  createdAt: string;
}

const userContent = 'Lorem ipsum dolor sit amet consectetur. Metus amet habitant nunc consequat...';
const userUpDated = 'Wed Jun 26 2024 17:48:18 GMT+0900';
const userDate = 'Wed Jun 26 2024 17:48:18 GMT+0900';

// Props 설정 & 타입정의
export default function Card({ imageUrl, upDatedAt = userUpDated, content = userContent, createdAt = userDate }: CardProps) {
  const [isStar, setIsStar] = useState<boolean>(false);
  const [isSettingMenu, setIsSettingMenu] = useState<boolean>(false);

  const yy = new Date(createdAt).getFullYear();
  const mm = new Date(createdAt).getMonth() + 1;
  const dd = new Date(createdAt).getDay();

  const onStarClick = () => {
    if (isStar === false) {
      setIsStar(true);
    } else {
      setIsStar(false);
    }
  };

  const onSettingMenuClick = () => {
    if (isSettingMenu === false) {
      setIsSettingMenu(true);
    } else {
      setIsSettingMenu(false);
    }
  };

  // util로 이동 예정
  const userUpDateAt = (date: string): string => {
    let userTime: number | string;
    const currentDate = new Date();
    const itemDate = new Date(date);
    const timeDiff = currentDate.getTime() - itemDate.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0 && hours < 24) {
      userTime = `${hours} hours ago`;
    } else if (hours >= 24) {
      const day = Math.floor(hours / 24);
      userTime = `${day} days ago`;
    } else {
      userTime = `${minutes} minutes ago`;
    }
    return userTime;
=======
import MeatBallsIcon from '../../../public/assets/card/MeatBallsIcon';
import CardImageNull from '../../../public/assets/card/CardImageNull';
import CardSettingList from './CardSettingList';
import Image from 'next/image';
import CardStar from './CardStar';
import { getUpdatedAt } from '@/util/getUserTime';

/**
 * Card 컴포넌트의 필요한 이벤트 헨들러, Props
 *
 * Props
 * imageUrl: 유저의 링크 이미지, type: string
 * content: 유저가 작성한 글, type: string
 * createdAt: 유저가 링크를 생성한 날짜, type: string
 * updatedAt: 유저의 마지막 수정 일자를 의미, type: string
 */

interface CardProps {
  imageUrl?: string;
  content: string;
  updatedAt: string;
  createdAt: string;
}

// Props 설정 & 타입정의
export default function Card({ imageUrl, updatedAt, content, createdAt }: CardProps) {
  const [addFavorites, setAddFavorites] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const userCreatedAt = new Date(createdAt);

  // 즐겨찾기 버튼 클릭
  const onFavoritesClick = () => {
    setAddFavorites((prevAddFavorites) => !prevAddFavorites);
  };

  // 드롭다운 메뉴 클릭
  const onDropdownOpen = () => {
    setOpenDropdown((prevOpenDropdown) => !prevOpenDropdown);
>>>>>>> main
  };

  return (
    <li className={styles.card}>
      <div className={styles.cardImageWrap}>
        {imageUrl ? <Image className={styles.cardImage} fill src={imageUrl} alt="링크 이미지" /> : <CardImageNull />}
<<<<<<< HEAD
        <div className={styles.cardStarWrap} onClick={onStarClick}>
          {isStar ? <CardStarTrue /> : <CardStarFalse />}
=======
        <div className={styles.cardStarWrap} onClick={onFavoritesClick}>
          <CardStar addFavorites={addFavorites} />
>>>>>>> main
        </div>
      </div>
      <div className={styles.cardMenuList}>
        <div className={styles.cardMenuTop}>
<<<<<<< HEAD
          <p className={styles.cardUpdateAt}>{userUpDateAt(upDatedAt)}</p>
          <button className={styles.cardSettingButton} onClick={onSettingMenuClick}>
            <MeatBallsIcon />
            {isSettingMenu ? <CardSettingList /> : null}
=======
          <p className={styles.cardUpdateAt}>{getUpdatedAt(updatedAt)}</p>
          <button className={styles.cardSettingButton} onClick={onDropdownOpen}>
            <MeatBallsIcon />
            {openDropdown && <CardSettingList />}
>>>>>>> main
          </button>
        </div>
        <p className={styles.cardDescription}>{content}</p>
        <p className={styles.cardCreatedAt}>
<<<<<<< HEAD
          <span className={styles.cardFullYear}>{yy}. </span>
          <span className={styles.cardMonth}>{mm}. </span>
          <span className={styles.cardDay}>{dd}</span>
=======
          <span className={styles.cardFullYear}>{userCreatedAt.getFullYear()}. </span>
          <span className={styles.cardMonth}>{userCreatedAt.getMonth() + 1}. </span>
          <span className={styles.cardDay}>{userCreatedAt.getDate()}</span>
>>>>>>> main
        </p>
      </div>
    </li>
  );
}
