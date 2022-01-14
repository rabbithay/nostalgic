import { Layout } from 'antd';
import './style.css'

export function HomePage () {
    const { Header, Footer, Content } = Layout;
    return (
        <Layout>
        <Header className="header">Header</Header>
        <Content className="content">Content</Content>
        <Footer className='footer'>Footer</Footer>
      </Layout>
    )
}

