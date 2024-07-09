import { useState } from 'react';

interface UseModalResult {
  isOpen: boolean;
  openModal: (content: React.ReactNode, title: string, subTitle?: string) => void;
  closeModal: () => void;
  modalContent: {
    content: React.ReactNode;
    title: string;
    subTitle?: string;
  };
}

const useModal = (): UseModalResult => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    content: React.ReactNode;
    title: string;
    subTitle?: string;
  }>({
    content: null,
    title: '',
    subTitle: '',
  });

  const openModal = (content: React.ReactNode, title: string, subTitle?: string) => {
    setModalContent({ content, title, subTitle });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    modalContent,
  };
};

export default useModal;
