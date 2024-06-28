import Modal from '@/components/Modal';
import UseOpenModal from '@/hook/useOpenModal';
export default function page() {
  const { isOpen, clickModal, closeModal } = UseOpenModal(); // openmodal spq
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} title="폴더 이름" subTitle = "폴더명"  />
      <button onClick={clickModal}></button>

      <h1>Hello, world!</h1>
      <p>This is a Next.js app with TypeScript, ESLint, Prettier, and SCSS.</p>
    </>
  );
}
// 1. 반응형, 2, 서브 타이틀 