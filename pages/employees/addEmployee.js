import React, { useEffect, useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { getAllDepartments } from '../../functions/Departments/getAllDepartments';
import addEmployee from '../../functions/Employees/addEmployee';
import { useRouter } from 'next/router';
import MyLayout from '../../components/MyLayout';


export default function employee() {


  const [form] = Form.useForm()
  const [departments, setDepartments] = useState(['placeholder'])
  const { Option } = Select;
  const router = useRouter()
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
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

  async function fetching() {
    const deps = await getAllDepartments()
    setDepartments(deps)
  }

  useEffect(() => {
    fetching()
  }, [])


  async function onFinish(values) {
    const success = await addEmployee(values.firstName, values.lastName, values.afm, values.dob.format('YYYY'), values.dob.format('MM'), values.dob.format('DD'), values.department)
    if(success){
    router.push('/departments/allDepartments')
    } else {
      console.log('failure')
      //router.push(error page)
    }

  }

  return (
    <div>
      <MyLayout>

        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{

          }}
          scrollToFirstError
          style={{ maxWidth: "400px", marginLeft: "30%", marginTop: "10%" }}
        >
          <h1 style={{ marginLeft: "40%" }}>New Employee</h1>
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
              {departments.map((value, index) => {
                return <Option key={value.id} value={value.id}>{value.departmentname}</Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="dob"
            label="DOB"
          >
            <DatePicker />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ marginLeft: "35%" }}>
              ADD
        </Button>
          </Form.Item>
        </Form>
      </MyLayout>
    </div>
  );
}
