import React, { useState } from 'react';
import { Form, Input, Button, Radio, Layout, Menu, Breadcrumb } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { addDepartment } from '../../functions/Departments/addDepartment';
import {useRouter} from 'next/router';
export default function updateDepartment() {


    async function onfinish(values){
        console.log(values)
        const success = addDepartment(values.newDepartmentName)
        
        if(success.status == 200){
            console.log("success")
        } else {
            console.log("Failure")
        }
        router.push(`/departments/allDepartments`)
    }


    const { Header, Content, Footer } = Layout;
    const router = useRouter()
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
    
    <Form style={{marginLeft: "40%", marginTop:"10%", maxWidth:"30%"}}
      name="update"
      onFinish={onfinish}
    >
        <h1>New Department</h1>
      <Form.Item
        name="newDepartmentName"
        rules={[
          {
            required: true,
            message: 'Please input the new name!',
          },
        ]}
      >
        <Input  placeholder="ex. Marketing"/>
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
    </div>
  );
};


