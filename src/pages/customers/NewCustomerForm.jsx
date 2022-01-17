import {
  Form, Input, Button, DatePicker,
} from 'antd';
import React from 'react';
import dayjs from 'dayjs';

export function NewCustomerForm({
  confirmLoading, setModalConfirmLoading, setIsModalVisible, handleCancel, setTableData, tableData,
}) {
  const onFinish = (values) => {
    console.error('Received values of form: ', values);

    setModalConfirmLoading(true);
    const {
      name,
      cpf,
      birthdate,
    } = values;

    const newCustomerInfo = {
      id: (tableData[tableData.length - 1].id + 1),
      name,
      cpf,
      birthdate: dayjs(birthdate).format('DD/MM/YY'),
    };

    setTableData([
      ...tableData,
      newCustomerInfo,
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
      className="new-customer"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="CPF"
        name="cpf"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Data de nascimento"
        name="birthdate"
        rules={[{ required: true }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>
        {' '}
        <Button type="primary" htmlType="submit" className="new-customer-button" loading={confirmLoading}>
          Confirmar
        </Button>
      </Form.Item>
    </Form>
  );
}
