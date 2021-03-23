import React, { useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


export default function employee(){
const { Option } = Select;

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

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    console.log('Date',values.dob.format('L'))
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const departments = ["Marketing","Sales","HR"];
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{

      }}
      scrollToFirstError
    >
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
        <Input.Password />
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
              {departments.map((value,index) => {
                  return <Option value={value}>{value}</Option>
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
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
   </Form>
  );
}
