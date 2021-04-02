import React, { useEffect, useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout, Menu, Breadcrumb, DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import getEmployee from '../../../functions/Employees/getEmployee';
import { getAllDepartments } from '../../../functions/Departments/getAllDepartments';
import updateEmployee from '../../../functions/Employees/updateEmployee';
import { useRouter } from 'next/router'
import { useForm } from 'antd/lib/form/Form';
import MyLayout from '../../../components/MyLayout';


export async function getServerSideProps(context) {
  return { props: { value: context.query.id } }
}

export default function employeePage(props) {
  const [departments, setDepartments] = useState(['placeholder'])
  const [employeeData, setEmployeeData] = useState()
  const [form] = Form.useForm()
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const { Option } = Select;
  const router = useRouter()
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

  async function updateEmployeeCall(values) {
    const success = await updateEmployee(props.value, values.firstName, values.lastName, values.afm, values.dob.format('YYYY'), values.dob.format('MM'), values.dob.format('DD'), values.department)
    if (success) {
      router.push(`/departments/allDepartments`)
    } else {
      console.log('failure')
      //router.push(error page)
    }

  }

  async function fetching() {
    const data = await getEmployee(props.value)
    const deps = await getAllDepartments()
    if (data && deps) {
      setEmployeeData(data)
      setDepartments(deps)
    } else {
      console.log('failure')
      //router.push(error page)
    }

  }

  useEffect(() => {
    fetching()

  }, [])


  useEffect(() => {
    if (employeeData && departments) {
      form.setFieldsValue({
        firstName: employeeData.firstname,
        lastName: employeeData.lastname,
        afm: employeeData.afm,
        department: employeeData.department,
        dob: moment(employeeData.dob)
      });
    }
  }, [employeeData])






  //const departments = props.deps.props.departments






  return (
    <div>
      <MyLayout>

        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={updateEmployeeCall}
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
            <Input /*defaultValue={employeeData?employeeData.firstName:null}*/ />
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
            <Input /*defaultValue={props.data.lastname}*/ />
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
            <Input /*defaultValue={props.data.afm}*/ />
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
            <Select /*</Form.Item>defaultValue={props.data.department}*/>
              {departments.map((value, index) => {
                return <Option key={value.id} value={value.id}>{value.departmentname}</Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="dob"
            label="DOB"
          >
            <DatePicker /*defaultValue={employeeData ? moment(employeeData.dob) : null}*/ />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ marginLeft: "35%" }}>
              UPDATE
        </Button>
          </Form.Item>
        </Form>
      </MyLayout>
    </div>
  );
};

