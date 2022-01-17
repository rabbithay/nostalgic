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
import { NewMovieForm } from './NewMovieForm';
import OpenModal from '../../components/Modal';

export function Movies() {
  const [movieList, setMovieList] = useState(movies);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Content } = Layout;
  const handleTable = useTable(movieList, setMovieList);
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

    const columnsInputType = {
      movieTitle: 'text',
      parentalRating: 'select',
      newRelease: 'select',
    };

    const columnsSelectOptions = {
      parentalRating: [
        {
          value: 'livre',
          text: 'Livre',
        }, {
          value: '10',
          text: '10',
        }, {
          value: '12',
          text: '12',
        }, {
          value: '14',
          text: '14',
        }, {
          value: '16',
          text: '16',
        }, {
          value: '18',
          text: '18',
        },
      ],
      newRelease: [
        {
          value: 'sim',
          text: 'sim',
        }, {
          value: 'não',
          text: 'não',
        },
      ],
    };

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: columnsInputType[col.dataIndex],
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        selectOptions: columnsSelectOptions[col.dataIndex],
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
    <NewMovieForm
      confirmLoading={confirmLoading}
      setModalConfirmLoading={setModalConfirmLoading}
      setIsModalVisible={setIsModalVisible}
      handleCancel={cancelModalVisibility}
      setTableData={setMovieList}
      tableData={movieList}
    />
  );

  return (
    <Layout>
      <Content className="content">
        <div className="plus-button">
          <Button type="primary" icon={<PlusOutlined />} size="medium" onClick={showModal}>
            Novo filme
          </Button>
          <OpenModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            tableData={movieList}
            setTableData={setMovieList}
            content={modalContent}
            handleCancel={cancelModalVisibility}
            confirmLoading={confirmLoading}
            title="Cadastrar novo filme"
          />
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
