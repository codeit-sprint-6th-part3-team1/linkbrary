import { useState } from "react";

const UseOpenModal = () => {
  const [open, setOpen] = useState(false);
  const clickModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  return { open, clickModal, closeModal };

};

export default UseOpenModal;

