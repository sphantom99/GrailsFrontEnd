import React, { useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout, Menu, Breadcrumb, DatePicker} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import getEmployee from '../../../functions/Employees/getEmployee';
import { getAllDepartments } from '../../../functions/Departments/getAllDepartments';
import employee from '../addEmployee';
import updateEmployee from '../../../functions/Employees/updateEmployee';
import {useRouter} from 'next/router'
export async function getServerSideProps(context){
  //console.log(context.params)
  const employee = await getEmployee(context.params.id)
  const departments = await getAllDepartments()
  employee.props.deps = departments
  if(employee){
    return employee
  }
}

export default function employeePage(props){

const router = useRouter()
async function updateEmployeeCall(values){
  //console.log(values.firstName,values.lastName,values.afm, values.dob.format('YYYY'), values.dob.format('MM'), values.dob.format('DD'), values.department)
  const resultValue = await updateEmployee(props.data.id, values.firstName,values.lastName,values.afm, values.dob.format('YYYY'), values.dob.format('MM'), values.dob.format('DD'), values.department)
  router.push(`/departments/allDepartments`)
  
}

const { Option } = Select;
const { Header, Content, Footer } = Layout;

const departments = props.deps.props.departments

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

console.log(props.data)
  const [form] = Form.useForm();

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
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
  
    <Form
      {...formItemLayout}
      //form={form}
      name="register"
      onFinish={updateEmployeeCall}
      initialValues={{
        firstName: props.data.firstname,
        lastName: props.data.lastname,
        afm: props.data.afm,
        department: props.data.department,
        dob: moment(props.data.dob)
      }}
      scrollToFirstError
      style={{maxWidth:"400px", marginLeft:"30%", marginTop:"10%"}}
    >
      <h1 style={{marginLeft:"40%"}}>New Employee</h1>
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: 'Please input the Employees First Name!',
          },
        ]}
      >
        <Input defaultValue={props.data.firstname} />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: 'Please input the Employees Last Name!',
          },
        ]}
      >
        <Input defaultValue={props.data.lastname}/>
      </Form.Item>

      <Form.Item
        name="afm"
        label="AFM"
        rules={[
          {
            required: true,
            message: 'Please input the Employees AFM!',
          },
        ]}
      >
        <Input defaultValue={props.data.afm}/>
        </Form.Item>
      <Form.Item
      name="department"
      label="Department"
      rules={[
          {
              required: true,
              message: 'Please Select the Department!',
          }
      ]}>
          <Select defaultValue={props.data.department}>
          {departments.map((value,index) => {
                  return <Option key={value.id} value={value.id}>{value.departmentname}</Option>
              })}
          </Select>
      </Form.Item>
      <Form.Item
      name="dob"
      label="DOB"
      >
          <DatePicker defaultValue={moment(props.data.dob)}/>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{marginLeft:"35%"}}>
          UPDATE
        </Button>
      </Form.Item>
   </Form>
   </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
    </div>
  );
};

