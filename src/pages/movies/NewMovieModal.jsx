import React, { useState } from 'react';
import { Modal } from 'antd';

export default function NewMovieModal({ isModalVisible, setIsModalVisible }) {
  const [confirmLoading, setModalConfirmLoading] = useState(false);
  const handleOk = () => {
    setModalConfirmLoading(true);
    setTimeout(() => {
      setIsModalVisible(false);
      setModalConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} confirmLoading={confirmLoading}>
      <p>The modal will be closed after two seconds</p>
    </Modal>
  );
}
