import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu, Breadcrumb } from 'antd';
import checkCredentials from '../functions/Login/checkCredentials';
import { useRouter } from 'next/router'
import { useState } from 'react';


export default function Login() {
  const { Header, Content, Footer } = Layout;
  const router = useRouter()
  const [failed,setFailed] = useState(false)

  
  async function onFinish(values) {
    const isUser = await checkCredentials(values.username, values.password)
    if (isUser) {
      router.push('/departments/allDepartments')
    } else {
      setFailed(true)
      console.log('failure')
    }
  }
  return (
    <div style={{ backgroundImage: "" }}>

      <div style={{ display: 'block', textAlign: 'center', columnWidth: "1000px" }}>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{ display: 'inline-block', marginLeft: 'auto', marginRight: 'auto', width: "300px", marginTop: '10%' }}
        >
          <h1>Login</h1>
          {failed?<span>Wrong Username or Password</span> : <span>Please fill out the following fields</span>}
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
        </Button>
            <br />
        Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
