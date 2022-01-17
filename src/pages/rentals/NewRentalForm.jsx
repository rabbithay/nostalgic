import {
  Form, Button, DatePicker, InputNumber,
} from 'antd';
import React from 'react';
import dayjs from 'dayjs';

export function NewRentalForm({
  confirmLoading, setModalConfirmLoading, setIsModalVisible, handleCancel, setTableData, tableData,
}) {
  const onFinish = (values) => {
    setModalConfirmLoading(true);
    const {
      clientId,
      movieId,
      rentDate,
      returnDate,
    } = values;

    console.log(rentDate);
    const newRentalInfo = {
      id: (tableData[tableData.length - 1].id + 1),
      clientId,
      movieId,
      rentDate: dayjs(rentDate).format('DD/MM/YY'),
      returnDate: returnDate ? dayjs(returnDate).format('DD/MM/YY') : '',
    };

    setTableData([
      ...tableData,
      newRentalInfo,
    ]);

    setTimeout(() => {
      setIsModalVisible(false);
      setModalConfirmLoading(false);
    }, 2000);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <Form
      {...layout}
      name="basic"
      className="new-rental"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Id do cliente"
        name="clientId"
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Id do filme"
        name="movieId"
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Data da locação"
        name="rentDate"
        rules={[{ required: true }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Data da devolução"
        name="returnDate"
      >
        <DatePicker />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit" className="new-rental-button" loading={confirmLoading}>
          Confirmar
        </Button>
      </Form.Item>
    </Form>
  );
}
