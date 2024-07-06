import React, { FC } from 'react';
import styles from '@/components/Card/style.module.scss';

const CardSettingList: React.FC = () => {
  return (
    <ul className={styles.cardSettingList}>
      <li className={styles.cardSettingMenu}>삭제하기</li>
      <li className={styles.cardSettingMenu}>수정하기</li>
    </ul>
  );
};

export default CardSettingList;