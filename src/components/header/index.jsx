import React from 'react';
import { Layout, Menu } from 'antd';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function HeaderComponent() {
  const { Header } = Layout;
  const navigate = useNavigate();

  return (
    <Header className="header">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" onClick={() => navigate('/filmes')}>Filmes</Menu.Item>
        <Menu.Item key="2" onClick={() => navigate('/clientes')}>Clientes</Menu.Item>
        <Menu.Item key="3" onClick={() => navigate('/alugueis')}>Aluguéis</Menu.Item>
      </Menu>
    </Header>
  );
}
