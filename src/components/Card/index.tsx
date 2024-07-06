import { useState } from 'react';
import styles from './style.module.scss';
<<<<<<< HEAD
<<<<<<< HEAD
import MeatBallsIcon from './MeatBallsIcon';
import CardImageNull from './CardImageNull';
import CardStarFalse from './CardStarFalseIcon';
import CardStarTrue from './CardStarTrueIcon';
=======
import MeatBallsIcon from './asset/MeatBallsIcon';
import CardImageNull from './asset/CardImageNull';
>>>>>>> a246fcbaf6d9013f2ef70341543812f83b4e5a56
import CardSettingList from './CardSettingList';
import Image from 'next/image';
import CardStar from './CardStar';
import { getUpdatedAt } from '@/util/getUserTime';

// Props interface로 타입 정의
interface CardProps {
  imageUrl?: string;
  updatedAt: string;
  content: string;
  createdAt: string;
}

// Props 설정 & 타입정의
export default function Card({ imageUrl, updatedAt, content, createdAt }: CardProps) {
  const [addFavorites, setAddFavorites] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userCreatedAt: Date = new Date(createdAt);

  const onFavoritesClick = () => {
    setAddFavorites((prevState) => !prevState);
  };

  const onDropdownOpen = () => {
    setDropdownOpen((prevState) => !prevState);
  };

<<<<<<< HEAD
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
=======
  /**
   *
   *
   */
>>>>>>> a246fcbaf6d9013f2ef70341543812f83b4e5a56

  return (
    <li className={styles.card}>
      <div className={styles.cardImageWrap}>
        {imageUrl ? <Image className={styles.cardImage} fill src={imageUrl} alt="링크 이미지" /> : <CardImageNull />}
<<<<<<< HEAD
<<<<<<< HEAD
        <div className={styles.cardStarWrap} onClick={onStarClick}>
          {isStar ? <CardStarTrue /> : <CardStarFalse />}
=======
        <div className={styles.cardStarWrap} onClick={onFavoritesClick}>
          <CardStar addFavorites={addFavorites} />
>>>>>>> main
=======
        <div className={styles.cardStarWrap} onClick={onFavoritesClick}>
          <CardStar addFavorites={addFavorites} />
>>>>>>> a246fcbaf6d9013f2ef70341543812f83b4e5a56
        </div>
      </div>
      <div className={styles.cardMenuList}>
        <div className={styles.cardMenuTop}>
<<<<<<< HEAD
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
=======
          <p className={styles.cardUpdateAt}>{getUpdatedAt(updatedAt)}</p>
          <button className={styles.cardSettingButton} onClick={onDropdownOpen}>
            <MeatBallsIcon />
            {dropdownOpen && <CardSettingList />}
>>>>>>> a246fcbaf6d9013f2ef70341543812f83b4e5a56
          </button>
        </div>
        <p className={styles.cardDescription}>{content}</p>
        <p className={styles.cardCreatedAt}>
<<<<<<< HEAD
<<<<<<< HEAD
          <span className={styles.cardFullYear}>{yy}. </span>
          <span className={styles.cardMonth}>{mm}. </span>
          <span className={styles.cardDay}>{dd}</span>
=======
          <span className={styles.cardFullYear}>{userCreatedAt.getFullYear()}. </span>
          <span className={styles.cardMonth}>{userCreatedAt.getMonth() + 1}. </span>
          <span className={styles.cardDay}>{userCreatedAt.getDate()}</span>
>>>>>>> main
=======
          <span className={styles.cardFullYear}>{userCreatedAt.getFullYear()}. </span>
          <span className={styles.cardMonth}>{userCreatedAt.getMonth() + 1}. </span>
          <span className={styles.cardDay}>{userCreatedAt.getDay()}</span>
>>>>>>> a246fcbaf6d9013f2ef70341543812f83b4e5a56
        </p>
      </div>
    </li>
  );
}
