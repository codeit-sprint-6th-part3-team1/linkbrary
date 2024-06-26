import { useState } from 'react';
import styles from './style.module.scss';
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
  };

  return (
    <li className={styles.card}>
      <div className={styles.cardImageWrap}>
        {imageUrl ? <Image className={styles.cardImage} fill src={imageUrl} alt="링크 이미지" /> : <CardImageNull />}
        <div className={styles.cardStarWrap} onClick={onStarClick}>
          {isStar ? <CardStarTrue /> : <CardStarFalse />}
        </div>
      </div>
      <div className={styles.cardMenuList}>
        <div className={styles.cardMenuTop}>
          <p className={styles.cardUpdateAt}>{userUpDateAt(upDatedAt)}</p>
          <button className={styles.cardSettingButton} onClick={onSettingMenuClick}>
            <MeatBallsIcon />
            {isSettingMenu ? <CardSettingList /> : null}
          </button>
        </div>
        <p className={styles.cardDescription}>{content}</p>
        <p className={styles.cardCreatedAt}>
          <span className={styles.cardFullYear}>{yy}. </span>
          <span className={styles.cardMonth}>{mm}. </span>
          <span className={styles.cardDay}>{dd}</span>
        </p>
      </div>
    </li>
  );
}
