import { ReactElement, useState, useEffect } from 'react';
import OrderModal from '@/components/Modal/ModalWrap/index';
import styles from '@/components/Modal/styles.module.scss';

const OrderList = (): ReactElement => {
  const [isModal, setIsModal] = useState<boolean>(false);

  function openModal() {
    setIsModal(true);
  }

  function closeModal() {
    setIsModal(false);
  }

  return (
    <div>
      <button className={styles.modal_btn} onClick={openModal}>
        모달창 보기
      </button>
      {isModal && <OrderModal open={isModal} close={closeModal} />}
    </div>
  );
};

export default OrderList;
