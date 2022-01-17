import React, { useState } from 'react';
import {
  Layout, Table, Form, Typography, Button,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import './style.css';
import { EditableCell } from '../../components/EditableCell';
import useTable from '../../hooks/useTable';
import { NewCustomerForm } from './NewCustomerForm';
import OpenModal from '../../components/Modal';
import { customers } from '../../data/customers';

export function Customers() {
  const [customerList, setCustomerList] = useState(customers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Content } = Layout;
  const handleTable = useTable(customerList, setCustomerList);
  const {
    isEditing, form, editingKey, saveEdit, cancelEdit, edit,
  } = handleTable;
  const [confirmLoading, setModalConfirmLoading] = useState(false);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      editable: false,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      editable: true,
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
      editable: true,
    },
    {
      title: 'Data de nascimento',
      dataIndex: 'birthdate',
      key: 'birthdate',
      editable: true,
    },
    {
      title: 'Apagar',
      dataIndex: '',
      key: 'x',
      render: (record) => (
        <Typography.Link
          onClick={() => handleTable.deleteRow({
            rowId: record.id,
          })}
          disabled={editingKey !== ''}
        >
          <DeleteOutlined />
        </Typography.Link>
      ),
    },
    {
      title: 'Editar',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          editable ? (
            <span>
              <Typography.Link
                onClick={() => saveEdit({
                  key: record.id,
                })}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Typography.Link onClick={() => cancelEdit()}>
                Cancel
              </Typography.Link>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit({ rowData: record })}>
              <EditOutlined />
            </Typography.Link>
          )
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const cancelModalVisibility = () => {
    setIsModalVisible(false);
  };

  const modalContent = (
    <NewCustomerForm
      confirmLoading={confirmLoading}
      setModalConfirmLoading={setModalConfirmLoading}
      setIsModalVisible={setIsModalVisible}
      handleCancel={cancelModalVisibility}
      setTableData={setCustomerList}
      tableData={customerList}
    />
  );

  return (
    <Layout>
      <Content className="content">
        <div className="plus-button">
          <Button type="primary" icon={<PlusOutlined />} size="medium" onClick={showModal}>
            Novo cliente
          </Button>
          <OpenModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            tableData={customerList}
            setTableData={setCustomerList}
            content={modalContent}
            handleCancel={cancelModalVisibility}
            confirmLoading={confirmLoading}
            title="Cadastrar novo cliente"
          />
        </div>
        <Form form={form} component={false}>
          <Table
            dataSource={customerList}
            columns={mergedColumns}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
          />
        </Form>
      </Content>
    </Layout>
  );
}
