import React, { useState } from 'react';
import {
  Layout, Table, Form, Typography, Button,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import './style.css';
import { movies } from '../../data/movies';
import { categoryFilters } from '../../utils/generateFilterList';
import { EditableCell } from '../../components/EditableCell';
import useTable from '../../hooks/useTable';
import NewMovieModal from './NewMovieModal';

export function Movies() {
  const [movieList, setMovieList] = useState(movies);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Content } = Layout;
  const handleTable = useTable(movieList, setMovieList);
  const {
    isEditing, form, editingKey, saveEdit, cancelEdit, edit,
  } = handleTable;

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

  return (
    <Layout>
      <Content className="content">
        <div className="plus-button">
          <Button type="primary" icon={<PlusOutlined />} size="medium" onClick={showModal}>
            Novo filme
          </Button>
          <NewMovieModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
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
