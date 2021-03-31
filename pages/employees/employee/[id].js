import React, { useEffect, useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout, Menu, Breadcrumb, DatePicker} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import getEmployee from '../../../functions/Employees/getEmployee';
import { getAllDepartments } from '../../../functions/Departments/getAllDepartments';
import employee from '../addEmployee';
import updateEmployee from '../../../functions/Employees/updateEmployee';
import {useRouter} from 'next/router'
import { useForm } from 'antd/lib/form/Form';
import MyLayout from '../../../components/MyLayout';
export async function getServerSideProps(context){
  //console.log(context.params)
  //const employee = await getEmployee(context.params.id)
  //const departments = await getAllDepartments()
  //employee.props.deps = departments
  return {props: { value: context.query.id}}
}

export default function employeePage(props){
const [departments,setDepartments] = useState(['placeholder'])
const [employeeData, setEmployeeData] = useState()
const [dataDone,setDataDone] = useState(false)
const [form] = Form.useForm()
  async function fetching(){
  const data = await getEmployee(props.value)
  const deps = await getAllDepartments()
  setDepartments(deps)
  setEmployeeData(data)
//  setDataDone(true)
}

useEffect(()=> {
  fetching()
 // console.log(departments,employeeData)
},[])


useEffect(()=>{
  if(employeeData && departments){
    console.log(employeeData)
    form.setFieldsValue({
      firstName: employeeData.firstname,
      lastName: employeeData.lastname,
      afm: employeeData.afm,
      department: employeeData.department,
      dob: moment(employeeData.dob) 
    });
  }
},[employeeData])
const router = useRouter()
async function updateEmployeeCall(values){
  
  console.log(values.firstName,values.lastName,values.afm, values.dob.format('YYYY'), values.dob.format('MM'), values.dob.format('DD'), values.department)
  const resultValue = await updateEmployee(props.value, values.firstName,values.lastName,values.afm, values.dob.format('YYYY'), values.dob.format('MM'), values.dob.format('DD'), values.department)
  router.push(`/departments/allDepartments`)
  
}

const { Option } = Select;
const { Header, Content, Footer } = Layout;

//const departments = props.deps.props.departments

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

//console.log(departments,employeeData)
 // const [form] = Form.useForm();

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
    <div>
    <MyLayout>
  
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={updateEmployeeCall}
      initialValues={{
        firstName: employeeData? employeeData.firstName : null
        /*
        lastName: props.data.lastname,
        afm: props.data.afm,
        department: props.data.department,
        dob: moment(props.data.dob)*/
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
        <Input /*defaultValue={props.data.lastname}*//>
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
        <Input /*defaultValue={props.data.afm}*//>
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
          {departments.map((value,index) => {
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
        <Button type="primary" htmlType="submit" style={{marginLeft:"35%"}}>
          UPDATE
        </Button>
      </Form.Item>
   </Form>
   </MyLayout>
    </div>
  );
};

