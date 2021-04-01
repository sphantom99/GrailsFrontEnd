import React, { useState } from 'react';
import { Form, Input, Button, Radio, Layout, Menu, Breadcrumb } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import updateDepartment from '../../functions/Departments/updateDepartment';
import {useRouter} from 'next/router'
import MyLayout from '../../components/MyLayout';

export async function getServerSideProps(context){
  console.log(context.query)
  return {props: { id: context.query.id,
                    name: context.query.name}}
}

export default function updateDepartments(context) {
  const router = useRouter()

  async function onfinish(values){
    //console.log(values)
    //console.log(context)
    const resultValue = await updateDepartment(context.id,values.newDepartmentName)
    router.push('/departments/allDepartments')
  }

  const { Header, Content, Footer } = Layout;
  return (
    <div>
    <MyLayout>
    <Form
      name="update"
      onFinish={onfinish}
      style={{marginTop:"10%", marginLeft:"35%",maxWidth:"400px"}}
      initialValues={{oldDepartmentName:context.name}}
    >
      <Form.Item
        label="Old Department Name"
        name="oldDepartmentName"
      >
        <Input disabled={true} />
      </Form.Item>

      <Form.Item
        label="New Department Name"
        name="newDepartmentName"
        rules={[
          {
            required: true,
            message: 'Please input the new name!',
          },
        ]}
      >
        <Input placeholder="ex. Marketing"/>
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit" style={{marginLeft:"40%"}}>
          Update
        </Button>
      </Form.Item>
    </Form>
    </MyLayout>
    </div>
  );
};
