import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';

import deleteEmployee from '../../functions/Employees/deleteEmployee';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import MyLayout from '../../components/MyLayout';
import getAllEmployees from '../../functions/Departments/getEmployees';




export async function getServerSideProps(context) {
  return {
    props: {
      name: context.query.department,
      id: context.query.id
    }
  }
}


export default function allEmployeesInDepartment(context) {
  const [employees, setEmployees] = useState()
  const { Column, ColumnGroup } = Table;
  const router = useRouter()
  const columns = [
    { title: 'First Name', dataIndex: 'firstname', key: 'firstname' },
    { title: 'Last Name', dataIndex: 'lastname', key: 'lastname' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => <span>
        <Button style={{ marginRight: "2%" }} type="primary" onClick={() => router.push(`/employees/${record.id}`)}>Update</Button>
        <Button type="danger" onClick={() => deleteEmployeeCall(record.id)}>Delete</Button>
      </span>
    },
  ];


  async function fetching() {
    const emps = await getAllEmployees(context.id)
    if (emps) {
      setEmployees(emps)
    } else {
      console.log('failure')
      //router.push( error page)
    }
  }


  useEffect(() => {
    fetching()
  }, [])


  async function deleteEmployeeCall(employeeID) {
    if (employeeID) {
      const r = confirm("Do you really want to delete this employee ?")
      if (r) {
        const success = await deleteEmployee(employeeID)
        if (success) {
          router.reload()
        } else {
          console.log('failure')
          //router.push(error page)
        }
      }

    }
  }

  return (
    <div>
      <MyLayout>
        <Table
          rowKey={(record) => { return (record.id) }}
          columns={columns}
          expandable={{
            expandedRowRender: record => <div><span style={{ marginRight: "5%" }}>DOB: {record.dob.slice(0, 10)}</span><span> AFM:  {record.afm}</span></div>,
            rowExpandable: record => record.firstname !== 'Not Expandable',
          }}
          dataSource={employees ? employees : null}
        />
      </MyLayout>
    </div>
  )
}