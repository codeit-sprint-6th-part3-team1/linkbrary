import React from 'react';
import styles from './styles.module.scss';



interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
}

const Modal = ({ isOpen = false, onClose, title = '제목을 입력해 주세요', subTitle, children = null }: ModalProps) => {
  if (isOpen === false) {
    return null;
  }
  return (
    <div className={styles.modalFrame}>
      {isOpen && <div className={styles.bg} onClick={onClose} />}
      <div className={styles.modal}>
        <div className={styles.btnArea}>
          <button className={styles.button} onClick={onClose}> 
            {' '}
            <div className="close"></div>
          </button>
        </div>
        <div className={styles.titleArea}>
          <p className={styles.title}>{title}</p>
          <p className ={styles.subTitle}>{subTitle}</p>
        </div>
        <div className={styles.content}>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
