import { Table, Tag, Space, Button } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu, Breadcrumb } from 'antd';
import { getAllDepartments } from '../../functions/Departments/getAllDepartments';
import { deleteDepartment } from '../../functions/Departments/deleteDepartment'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import {useState } from 'react'
import { Link } from 'next/link'
import MyLayout from '../../components/MyLayout';





export default function allDepartments(){
  const router = useRouter()
  const[allDepartments,setAllDepartments]= useState()
  async function fetching(){
   const deps = await getAllDepartments()
   console.log(deps)
   setAllDepartments(deps)
  }
  
 useEffect(()=>{
    fetching()
  },[])
  async function deleteDepartmentCall(departmentName){
    console.log(departmentName)
    if(departmentName){
    const r = confirm("Delete Department?")
      if(r){
        const result = deleteDepartment(departmentName)
      //setAllDepartments(allDepartments.pop())
      //console.log(result)
      router.reload()
      }
      
    }
  }
 console.log(allDepartments)

 async function updateDepartmentCall(department){
  if(department){
    router.push(`/departments/updateDepartment?id=${department.id}&name=${department.departmentname}`)
  }
}

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
//const dataI = allDepartments.props.departments//null//allDepartments.departments
return(
    <div>
    <MyLayout>
  <Table style={{marginLeft: "20%",marginTop: "10%"}} dataSource={allDepartments? allDepartments:null} rowKey="id">
      <Column title="Departments" dataIndex="departmentname" />
     <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <Space size="middle">
            <Button type="primary" onClick={()=> router.push(`/departments/department/${record.departmentname}`)}>View Employees</Button>
          <Button type="primary" onClick={()=> router.push('/employees/addEmployee')}>Add an Employee</Button>
          <Button type="primary" onClick={()=> updateDepartmentCall(record)}>Update</Button>
          <Button type="primary" danger onClick={() => deleteDepartmentCall(record.departmentname)}>
            Delete
          </Button>
        </Space>
      )}
    />
  </Table>
  </MyLayout>
    </div>
)
}

