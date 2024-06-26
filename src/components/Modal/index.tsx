import React from 'react';
import styles from './styles.module.scss';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal = ({ isOpen = true, onClose, title = '제목을 입력해 주세요', children = null }: ModalProps) => {
  return (
    <div className={styles.modalFrame}>
      {isOpen && <div className={styles.bg} onClick={onClose} />}
      <div className={styles.modal}>
        <div className={styles.btnArea}>
          <button className={styles.button} onClick={onClose}>
            <div className="close"></div>
          </button>
        </div>
        <div className={styles.titleArea}>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.content}>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
