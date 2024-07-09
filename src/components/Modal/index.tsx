/* eslint-disable jsx-a11y/no-static-element-interactions */
import ModalCloseIcon from './assets/ModalCloseIcon';

import styles from './styles.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
}

const Modal = ({ isOpen = false, onClose, title, subTitle, children = null }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalFrame}>
      <div className={styles.bg} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.btnArea}>
          <button className={styles.button} onClick={onClose} type="button" aria-label="Close Modal">
            <ModalCloseIcon />
          </button>
        </div>
        <div className={styles.titleArea}>
          <p className={styles.title}>{title}</p>
          {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
