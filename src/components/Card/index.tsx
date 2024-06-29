import { useState } from 'react';
import styles from './style.module.scss';
import MeatBallsIcon from './asset/MeatBallsIcon';
import CardImageNull from './asset/CardImageNull';
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

  /**
   *
   *
   */

  return (
    <li className={styles.card}>
      <div className={styles.cardImageWrap}>
        {imageUrl ? <Image className={styles.cardImage} fill src={imageUrl} alt="링크 이미지" /> : <CardImageNull />}
        <div className={styles.cardStarWrap} onClick={onFavoritesClick}>
          <CardStar addFavorites={addFavorites} />
        </div>
      </div>
      <div className={styles.cardMenuList}>
        <div className={styles.cardMenuTop}>
          <p className={styles.cardUpdateAt}>{getUpdatedAt(updatedAt)}</p>
          <button className={styles.cardSettingButton} onClick={onDropdownOpen}>
            <MeatBallsIcon />
            {dropdownOpen && <CardSettingList />}
          </button>
        </div>
        <p className={styles.cardDescription}>{content}</p>
        <p className={styles.cardCreatedAt}>
          <span className={styles.cardFullYear}>{userCreatedAt.getFullYear()}. </span>
          <span className={styles.cardMonth}>{userCreatedAt.getMonth() + 1}. </span>
          <span className={styles.cardDay}>{userCreatedAt.getDay()}</span>
        </p>
      </div>
    </li>
  );
}
