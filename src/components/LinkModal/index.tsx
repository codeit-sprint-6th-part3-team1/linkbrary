import s from './styles.module.scss';

interface LinkModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const LinkModal: React.FC<LinkModalProps> = ({ isOpen, closeModal, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>{children}</div>
    </div>
  );
};

export default LinkModal;
