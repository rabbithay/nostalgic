import React, { useState } from 'react';
import {
  Layout, Table, Modal, Form, Typography, Button,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import './style.css';
import { movies } from '../../data/movies';
import { categoryFilters } from '../../utils/generateFilterList';
import { EditableCell } from '../../components/EditableCell';
import * as handleTable from '../../utils/tableActions';

export function Movies() {
  const [form] = Form.useForm();
  const [movieList, setMovieList] = useState(movies);
  const [isEditingKey, setIsEditingKey] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setModalConfirmLoading] = useState(false);

  const { Content } = Layout;

  const isEditing = (record) => record.id === isEditingKey;

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      editable: false,
    },
    {
      title: 'Título',
      dataIndex: 'movieTitle',
      key: 'movieTitle',
      sorter: (a, b) => a.movieTitle.localeCompare(b.movieTitle),
      editable: true,
    },
    {
      title: 'Classificação Indicativa',
      dataIndex: 'parentalRating',
      key: 'parentalRating',
      sorter: (a, b) => a.parentalRating - b.parentalRating,
      filters: categoryFilters(movieList, 'parentalRating'),
      onFilter: (value, record) => record.parentalRating === value,
      editable: true,
    },
    {
      title: 'Lançamento',
      dataIndex: 'newRelease',
      key: 'newRelease',
      filters: categoryFilters(movieList, 'newRelease'),
      onFilter: (value, record) => record.newRelease === value,
      editable: true,
    },
    {
      title: 'Apagar',
      dataIndex: '',
      key: 'x',
      render: (record) => (
        <Typography.Link
          onClick={() => handleTable.deleteRow({
            tableData: movieList, setTableData: setMovieList, rowId: record.id,
          })}
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
                onClick={() => handleTable.saveEdit({
                  useForm: form,
                  tableData: movieList,
                  setTableData: setMovieList,
                  key: record.id,
                  setIsEditingKey,
                })}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Typography.Link onClick={() => handleTable.cancelEdit({ setIsEditingKey })}>
                Cancel
              </Typography.Link>
            </span>
          ) : (
            <Typography.Link disabled={isEditingKey !== ''} onClick={() => handleTable.edit({ useForm: form, rowData: record, setIsEditingKey })}>
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
        inputType: col.dataIndex === 'parentalRating' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

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
    <Layout>
      <Content className="content">
        <div className="plus-button">
          <Button type="primary" icon={<PlusOutlined />} size="medium" onClick={showModal}>
            Novo filme
          </Button>
          <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} confirmLoading={confirmLoading}>
            <p>The modal will be closed after two seconds</p>

          </Modal>

        </div>
        <Form form={form} component={false}>
          <Table
            dataSource={movieList}
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
