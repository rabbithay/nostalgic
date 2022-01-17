import React from 'react';
import { Modal } from 'antd';

export default function NewMovieModal({
  isModalVisible,
  confirmLoading,
  content,
  handleCancel,
}) {
  return (
    <Modal
      title="Cadastrar novo filme"
      visible={isModalVisible}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={[]}
    >
      {content}
    </Modal>

  );
}
