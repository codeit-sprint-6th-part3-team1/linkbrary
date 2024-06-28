import { useState } from 'react';

const UseOpenModal = () => { 
  const [isOpen, setOpen] = useState(false); 
  const clickModal = () => {
    setOpen(true); 
  };
  const closeModal = () => {
    setOpen(false);
  };
  return { isOpen, clickModal, closeModal }; 
};

export default UseOpenModal; 
// 