import { Table, Tag, Space, Button } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu, Breadcrumb } from 'antd';

export default function allDepartments(){


const { Column, ColumnGroup } = Table;
const { Header, Content, Footer } = Layout;
const data = [
  {
    key: '1',
    departmentName: 'Marketing',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    departmentName: 'Sales',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    departmentName: 'HR',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

return(
    <div>
    <Layout className="layout">
    <Header>
  <div className="logo" />
  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
    <Menu.Item key="1">nav 1</Menu.Item>
    <Menu.Item key="2">nav 2</Menu.Item>
    <Menu.Item key="3">nav 3</Menu.Item>
  </Menu>
    </Header>
<Content style={{ padding: '0 50px' }}>
  <Table style={{marginLeft: "20%",marginTop: "10%"}} dataSource={data}>
      <Column title="Departments" dataIndex="departmentName" key="departmentName" />
     <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <Space size="middle">
            <button>View</button>
          <a>View Employees</a>
          <a>Add an Employee</a>
          <a>Update</a>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      )}
    />
  </Table>
  </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
    </div>
)
}