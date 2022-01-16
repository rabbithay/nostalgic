import {
  Form, Input, Button, Select, Switch,
} from 'antd';
import React from 'react';

export function NewMovieForm({
  confirmLoading, setModalConfirmLoading, setIsModalVisible, handleCancel, setTableData, tableData,
}) {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    setModalConfirmLoading(true);
    const { title, parentalRating, newRelease } = values;

    const newMovieInfo = {
      id: (tableData[tableData.length - 1].id + 1),
      movieTitle: title,
      parentalRating,
      newRelease: (newRelease) ? 'sim' : 'não',
    };

    setTableData([
      ...tableData,
      newMovieInfo,
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
      className="new-movie"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Título"
        name="title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Classificação indicativa"
        name="parentalRating"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="livre">Livre</Select.Option>
          <Select.Option value="10">10</Select.Option>
          <Select.Option value="12">12</Select.Option>
          <Select.Option value="14">14</Select.Option>
          <Select.Option value="16">16</Select.Option>
          <Select.Option value="18">18</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="newRelease" label="Lançamento" valuePropName="newRelease">
        <Switch />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit" className="new-movie-button" loading={confirmLoading}>
          Confirmar
        </Button>
      </Form.Item>
    </Form>
  );
}
