import React from 'react';
import { PageHeader, Button } from 'antd';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function HeaderComponent() {
  const navigate = useNavigate();

  return (

    <PageHeader
      className="header"
      ghost={false}
      onBack={() => window.history.back()}
      title="NostalgicVHS"
      subTitle="Sistema de gestão de locação filmes"
      extra={[
        <Button onClick={() => navigate('/')} key="1">Filmes</Button>,
        <Button onClick={() => navigate('/clientes')} key="2">Clientes</Button>,
        <Button onClick={() => navigate('/alugueis')} key="3">Aluguéis</Button>,

      ]}
    />
  );
}
