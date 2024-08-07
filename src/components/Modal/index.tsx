import React from 'react';
import styles from './styles.module.scss';
import ModalCloseIcon from './assets/ModalCloseIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
}

const Modal = ({ isOpen = false, onClose, title, subTitle, children = null }: ModalProps) => {
  if (isOpen === false) {
    return null;
  }
  return (
    <div className={styles.modalFrame}>
      {isOpen && <div className={styles.bg} onClick={onClose} />}
      <div className={styles.modal}>
        <div className={styles.btnArea}>
          <button className={styles.button} onClick={onClose}>
            <ModalCloseIcon />
          </button>
        </div>
        <>
          <div className={styles.titleArea}>
            <p className={styles.title}>{title}</p>
            {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
          </div>
          <div className={styles.content}>
            <div>{children}</div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Modal;
