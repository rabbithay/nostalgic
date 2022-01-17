import React, { useState } from 'react';
import {
  Layout, Table, Form, Typography, Button,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import './style.css';
import { EditableCell } from '../../components/EditableCell';
import useTable from '../../hooks/useTable';
import { NewRentalForm } from './NewRentalForm';
import OpenModal from '../../components/Modal';
import { rentals } from '../../data/rentals';
import { categoryFilters } from '../../utils/generateFilterList';

export function Rentals() {
  const [rentalList, setRentalList] = useState(rentals);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Content } = Layout;
  const handleTable = useTable(rentalList, setRentalList);
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
      title: 'Id do cliente',
      dataIndex: 'clientId',
      key: 'clientId',
      filters: categoryFilters(rentalList, 'clientId'),
      onFilter: (value, record) => record.clientId === value,
      editable: false,
    },
    {
      title: 'Id do filme',
      dataIndex: 'movieId',
      key: 'movieId',
      filters: categoryFilters(rentalList, 'movieId'),
      onFilter: (value, record) => record.movieId === value,
      editable: false,
    },
    {
      title: 'Data de locação',
      dataIndex: 'rentDate',
      key: 'rentDate',
      sorter: (a, b) => a.rentDate.localeCompare(b.rentDate),
      editable: true,
    },
    {
      title: 'Data de devolução',
      dataIndex: 'returnDate',
      key: 'returnDate',
      editable: true,
      filters: [
        {
          text: 'devolvido',
          value: true,
        },
        {
          text: 'pendente',
          value: false,
        },
      ],
      onFilter: (value, record) => !!record.returnDate === value,
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
    <NewRentalForm
      confirmLoading={confirmLoading}
      setModalConfirmLoading={setModalConfirmLoading}
      setIsModalVisible={setIsModalVisible}
      handleCancel={cancelModalVisibility}
      setTableData={setRentalList}
      tableData={rentalList}
    />
  );

  return (
    <Layout>
      <Content className="content">
        <div className="plus-button">
          <Button type="primary" icon={<PlusOutlined />} size="medium" onClick={showModal}>
            Novo aluguel
          </Button>
          <OpenModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            tableData={rentalList}
            setTableData={setRentalList}
            content={modalContent}
            handleCancel={cancelModalVisibility}
            confirmLoading={confirmLoading}
            title="Registrar nova locação"
          />
        </div>
        <Form form={form} component={false}>
          <Table
            dataSource={rentalList}
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
