import React, { useState } from 'react';
import { Modal } from 'antd';
import { NewMovieForm } from './NewMovieForm';

export default function NewMovieModal({
  isModalVisible, setIsModalVisible, tableData, setTableData,
}) {
  const [confirmLoading, setModalConfirmLoading] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (

    <Modal
      title="Cadastrar novo filme"
      visible={isModalVisible}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={
      []
    }
    >
      <NewMovieForm
        confirmLoading={confirmLoading}
        setModalConfirmLoading={setModalConfirmLoading}
        setIsModalVisible={setIsModalVisible}
        handleCancel={handleCancel}
        tableData={tableData}
        setTableData={setTableData}
      />
    </Modal>

  );
}
