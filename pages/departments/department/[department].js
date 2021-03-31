import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {Button, Layout, Menu, Breadcrumb } from 'antd';
import {getAllEmployees} from '../../../functions/Departments/getEmployees'
import deleteEmployee from '../../../functions/Employees/deleteEmployee';
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';



export async function getServerSideProps(context){
  console.log(context.query)
  return {props: { name: context.query.department}}
}


export default function allEmployeesInDepartment(context){
  const [employees,setEmployees] = useState()
  async function fetching(){
    const emps = await getAllEmployees(context.name)

    setEmployees(emps)
  }
  useEffect(()=> {
    fetching()
    console.log(employees)
  },[])

 
//console.log(context.params)
//console.log(context.name)

  const columns = [
    { title: 'First Name', dataIndex: 'firstname', key: 'firstname' },
    { title: 'Last Name', dataIndex: 'lastname', key: 'lastname' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => <span>
                          <Button style={{marginRight:"2%"}} type="primary">Update</Button>
                          <Button type="danger" onClick={()=> deleteEmployeeCall(record.id)}>Delete</Button>
                    </span>
    },
  ];
//const dataI = employees.employees
const { Column, ColumnGroup } = Table;
const { Header, Content, Footer } = Layout;
const router = useRouter()




async function deleteEmployeeCall(employeeID){
    console.log(employeeID)
    if(employeeID){
        const resultValue = await deleteEmployee(employeeID)
        //setEmployees(employees.pop())
        router.reload()
    }

}

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
    dataSource={employees?employees:null}//employees.props.employees}
  />
  </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
    </div>
)
}