import React from 'react';
import { Layout } from 'antd';
import './style.css';

export function HomePage() {
  const { Content } = Layout;
  return (
    <Layout>
      <Content className="content">Content</Content>
    </Layout>
  );
}
