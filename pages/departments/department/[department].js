import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {Button, Layout, Menu, Breadcrumb } from 'antd';
import {getAllEmployees} from '../../../functions/Departments/getEmployees'
import deleteEmployee from '../../../functions/Employees/deleteEmployee';
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import MyLayout from '../../../components/MyLayout';



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
                          <Button style={{marginRight:"2%"}} type="primary" onClick={()=> router.push(`/employees/employee/${record.id}`)}>Update</Button>
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
    <MyLayout>
<Table
    rowKey={(record) => {return(record.id)} }
    columns={columns}
    expandable={{
      expandedRowRender: record => <div><span style={{marginRight:"5%"}}>DOB: {record.dob.slice(0,10)}</span><span> AFM:  {record.afm}</span></div>,
      rowExpandable: record => record.firstname !== 'Not Expandable',
    }}
    dataSource={employees?employees:null}//employees.props.employees}
  />
  </MyLayout>
    </div>
)
}