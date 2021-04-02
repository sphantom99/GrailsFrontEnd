import React, { useState } from 'react';
import { Form, Input, Button, Radio, Layout, Menu, Breadcrumb } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { addDepartment } from '../../functions/Departments/addDepartment';
import { useRouter } from 'next/router';
import MyLayout from '../../components/MyLayout';


export default function updateDepartment() {
  const router = useRouter()

  async function onfinish(values) {
    console.log(values)
    const success = addDepartment(values.newDepartmentName)

    if (success) {
      console.log("success")
      router.push(`/departments/allDepartments`)
    } else {
      console.log("Failure")
      //router.push(error page)
    }
   
  }



  return (
    <div>
      <MyLayout>

        <Form style={{ marginLeft: "40%", marginTop: "10%", maxWidth: "30%" }}
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
            <Input placeholder="ex. Marketing" />
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </MyLayout>
    </div>
  );
};


