import { useState } from 'react';

interface UseModalResult {
  isOpen: boolean;
  openModal: (url: string) => void;
  closeLinkModal: () => void;
  selectedModalLink: {
    url: string;
  };
}

const useModal = (): UseModalResult => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModalLink, setSelectedLink] = useState({ url: '' });

  const openModal = (url: string) => {
    setSelectedLink({ url });
    setIsOpen(true);
  };

  const closeLinkModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeLinkModal,
    selectedModalLink,
  };
};

export default useModal;
