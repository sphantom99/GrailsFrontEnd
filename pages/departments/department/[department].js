import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {Button, Layout, Menu, Breadcrumb } from 'antd';
import {getAllEmployees} from '../../../functions/Departments/getEmployees'

export async function getServerSideProps(context){
    const employees = await getAllEmployees(context.params.department)
    return employees
}
export default function allEmployeesInDepartment({employees}){
  const columns = [
    { title: 'First Name', dataIndex: 'firstname', key: 'firstname' },
    { title: 'Last Name', dataIndex: 'lastname', key: 'lastname' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <span>
                          <Button style={{marginRight:"2%"}} type="primary">Update</Button>
                          <Button type="danger">Delete</Button>
                    </span>
    },
  ];
  const dataI = employees
  const data = [
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      name: 'Not Expandable',
      age: 29,
      address: 'Jiangsu No. 1 Lake Park',
      description: 'This not expandable',
    },
    {
      key: 4,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ];
const { Column, ColumnGroup } = Table;
const { Header, Content, Footer } = Layout;


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
<Table
    rowKey={(record) => {return(record.id)} }
    columns={columns}
    expandable={{
      expandedRowRender: record => <div><span style={{marginRight:"5%"}}>DOB: {record.dob.slice(0,10)}</span><span> AFM:  {record.afm}</span></div>,
      rowExpandable: record => record.firstname !== 'Not Expandable',
    }}
    dataSource={dataI}
  />
  </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
    </div>
)
}