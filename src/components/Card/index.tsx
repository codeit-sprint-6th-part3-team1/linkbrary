import { useState } from 'react';
import styles from './style.module.scss';
import MeatBallsIcon from '@public/assets/Card/MeatBallsIcon';
import CardImageNull from '@public/assets/Card/CardImageNull';
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
  };

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
            {openDropdown && <CardSettingList />}
          </button>
        </div>
        <p className={styles.cardDescription}>{content}</p>
        <p className={styles.cardCreatedAt}>
          <span className={styles.cardFullYear}>{userCreatedAt.getFullYear()}. </span>
          <span className={styles.cardMonth}>{userCreatedAt.getMonth() + 1}. </span>
          <span className={styles.cardDay}>{userCreatedAt.getDate()}</span>
        </p>
      </div>
    </li>
  );
}
