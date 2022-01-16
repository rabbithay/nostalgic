/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import {
  Layout, Table, Form, Typography, InputNumber, Input,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { movies } from '../../data/movies';
import './style.css';
import { categoryFilters } from '../../utils/generateFilterList';

function EditableCell({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}

export function Movies() {
  const [form] = Form.useForm();
  const [movieList, setMovieList] = useState(movies);
  const [isEditingKey, setIsEditingKey] = useState('');

  const { Content } = Layout;

  const isEditing = (record) => record.id === isEditingKey;

  function handleDelete(movieId) {
    setMovieList(movieList.filter((movie) => movie.id !== movieId));
  }

  function handleEdit(movieInfo) {
    form.setFieldsValue({
      ...movieInfo,
    });
    setIsEditingKey(movieInfo.id);
  }

  function handleCancelEdit() {
    setIsEditingKey('');
  }

  async function handleSaveEdit(id) {
    try {
      const row = await form.validateFields();
      const newData = [...movieList];
      const index = newData.findIndex((movie) => id === movie.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
      } else {
        newData.push(row);
      }
      setMovieList(newData);
      setIsEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }

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
      render: (action) => (
        <DeleteOutlined onClick={() => handleDelete(action.id)} />
      ),
    },
    {
      title: 'Editar',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, action) => {
        const editable = isEditing(action);
        return (
          editable ? (
            <span>
              <Typography.Link
                onClick={() => handleSaveEdit(action.id)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Typography.Link onClick={() => handleCancelEdit()}>
                Cancel
              </Typography.Link>
            </span>
          ) : (
            <Typography.Link disabled={isEditingKey !== ''} onClick={() => handleEdit(action)}>
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

  return (
    <Layout>
      <Content className="content">
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
