import React from 'react';
import { Modal } from 'antd';

export default function OpenModal({
  isModalVisible,
  confirmLoading,
  content,
  handleCancel,
  title,
}) {
  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={[]}
    >
      {content}
    </Modal>

  );
}
