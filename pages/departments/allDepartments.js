import { Table, Space, Button } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu, Breadcrumb } from 'antd';
import { getAllDepartments } from '../../functions/Departments/getAllDepartments';
import { deleteDepartment } from '../../functions/Departments/deleteDepartment'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'next/link'
import MyLayout from '../../components/MyLayout';





export default function allDepartments() {
  const router = useRouter()
  const [allDepartments, setAllDepartments] = useState()
  const { Column, ColumnGroup } = Table;


  async function fetching() {
    const deps = await getAllDepartments()
    if(deps){
      setAllDepartments(deps)
    } else {
      console.log('failure')
      //router.push(error page)
    }
  }


  useEffect(() => {
    fetching()
  }, [])


  async function deleteDepartmentCall(departmentID) {
    if (departmentID) {
      const confirmed = confirm("Delete Department?")
      if (confirmed) {
        const success = deleteDepartment(departmentID)
        if(success){
        router.reload()
      } else {
        console.log('failure')
        //push to error page
      }
      }

    }
  }


  async function updateDepartmentCall(department) {
    if (department) {
      router.push(`/departments/updateDepartment?id=${department.id}&name=${department.departmentname}`)
    }
  }




  return (
    <div>
      <MyLayout>
        <Table style={{ marginLeft: "20%", marginTop: "10%" }} dataSource={allDepartments ? allDepartments : null} rowKey="id">
          <Column title="Departments" dataIndex="departmentname" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <Button type="primary" onClick={() => router.push(`/departments/${record.departmentname}?id=${record.id}`)}>View Employees</Button>
                <Button type="primary" onClick={() => router.push('/employees/addEmployee')}>Add an Employee</Button>
                <Button type="primary" onClick={() => updateDepartmentCall(record)}>Update</Button>
                <Button type="primary" danger onClick={() => deleteDepartmentCall(record.id)}>
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

