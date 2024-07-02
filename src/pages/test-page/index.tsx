import Modal from '@/components/Modal';
import useOpenModal from '@/hook/useOpenModal';
export default function page() {
  const { isOpen, openModal, closeModal } = useOpenModal(); 
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} title="폴더 이름" subTitle = "폴더명"  />
      <button onClick={openModal}></button>

      <h1>Hello, world!</h1>
      <p>helllo</p>
      <p>This is a Next.js app with TypeScript, ESLint, Prettier, and SCSS.</p>
    </>
  );
}