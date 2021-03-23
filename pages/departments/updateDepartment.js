import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

export default function updateDepartment() {


    const onfinish = (values) => {
        console.log(values)
    }
  return (
    <Form
      name="update"
      onFinish={onfinish}
    >
      <Form.Item
        label="Old Department Name"
        name="oldDepartmentName"
      >
        <Input disabled={true} placeholder="old name"/>
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
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
