import React, { useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { getAllDepartments } from '../../functions/Departments/getAllDepartments';
import addEmployee from '../../functions/Employees/addEmployee';
import { useRouter } from 'next/router';

export async function getServerSideProps(){
  const departments = await getAllDepartments()
  if(departments.props.status==500){
    console.log(departments.props.message)
  } else {
    return departments
  }
}

export default function employee(departments){
const { Option } = Select;
const { Header, Content, Footer } = Layout;

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


  const [form] = Form.useForm();
  const router = useRouter()
  async function onFinish(values){
    console.log(values)
    console.log(values.dob.format('YYYY'), values.dob.format('MM'), values.dob.format('DD'))
    const resultValue = await addEmployee(values.firstName, values.lastName, values.afm, values.dob.format('YYYY'), values.dob.format('MM'), values.dob.format('DD'), values.department)
    const result = resultValue 
    console.log(result)
    //router.push('/departments/allDepartments')
    
  }


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
      onFinish={onFinish}
      initialValues={{

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
        <Input />
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
        <Input />
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
        <Input />
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
          <Select>
          {departments.departments.map((value,index) => {
                  return <Option key={value.id} value={value.id}>{value.departmentname}</Option>
              })}
          </Select>
      </Form.Item>
      <Form.Item
      name="dob"
      label="DOB"
      >
          <DatePicker/>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{marginLeft:"35%"}}>
          ADD
        </Button>
      </Form.Item>
   </Form>
   </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
    </div>
  );
}
