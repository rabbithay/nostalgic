
import { Layout, Table } from 'antd';
import { columns, movies } from '../../data/movies';
import './style.css'


export function Movies () {
    const { Header, Footer, Content } = Layout;
    return (
      <Layout>
        <Header className="header">Header</Header>

        <Content className="content">
          <Table dataSource={movies} columns={columns} />
        </Content>

        <Footer className='footer'>created by @rabbithay</Footer>
      </Layout>
    )
}