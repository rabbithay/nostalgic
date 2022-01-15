import React from 'react';
import { Layout, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { movies } from '../../data/movies';
import './style.css';

import { categoryFilters } from '../../utils/generateFilterList';

export function Movies() {
  const { Content } = Layout;

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Título',
      dataIndex: 'movieTitle',
      key: 'movieTitle',
      sorter: (a, b) => a.movieTitle.localeCompare(b.movieTitle),
    },
    {
      title: 'Classificação Indicativa',
      dataIndex: 'parentalRating',
      key: 'parentalRating',
      sorter: (a, b) => a.parentalRating - b.parentalRating,
      filters: categoryFilters(movies, 'parentalRating'),
      onFilter: (value, record) => record.parentalRating.indexOf(value) === 0,
    },
    {
      title: 'Lançamento',
      dataIndex: 'newRelease',
      key: 'newRelease',
      filters: categoryFilters(movies, 'newRelease'),
      onFilter: (value, record) => record.newRelease.indexOf(value) === 0,
    },
    {
      title: 'Deletar',
      dataIndex: '',
      key: 'x',
      render: () => <DeleteOutlined />,
    },
  ];

  return (
    <Layout>
      <Content className="content">
        <Table dataSource={movies} columns={columns} />
      </Content>
    </Layout>
  );
}
