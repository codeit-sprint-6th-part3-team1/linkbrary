import React, { ReactElement } from 'react';
import styles from '@/components/Modal/ModalWrap/styles.module.scss';

interface Props {
  open: boolean;
  close: (v: boolean) => void;
}

const OrderModal = (props: Props): ReactElement => {
  const { open, close } = props;

  return (
    <div className={styles['modal-wrap']}>
      {open && <div className={styles.bg} />}
      <div className={open ? `${styles.modal} ${styles.active}` : styles.modal}>
        <div className={styles.area}>
          <button className={styles.close} onClick={() => close(false)}>
            {' '}
            x{' '}
          </button>
          <p>모달 타이틀</p>
          <p>모달 내용</p>
        </div>
      </div>
    </div>
  );
};
export default OrderModal;
