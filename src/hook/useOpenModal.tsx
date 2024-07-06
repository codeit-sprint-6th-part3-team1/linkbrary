import { useState } from 'react';

const useOpenModal = () => { 
  const [isOpen, setOpen] = useState(false); 
  const openModal = () => {
    setOpen(true); 
  };
  const closeModal = () => {
    setOpen(false);
  };
  return { isOpen, openModal, closeModal }; 
};

export default useOpenModal; 
// 