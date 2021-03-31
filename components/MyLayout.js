import { Layout, Menu, Breadcrumb } from 'antd';
import {useRouter} from 'next/router'
import logout from '../functions/Login/logout';
import Link from 'next/link'

export default function MyLayout({children}){
const { Header, Content, Footer } = Layout;
const router = useRouter()
 async function logoutCall(){
   const success = await logout()
   if(success)
   router.push('/login')
 }
    return(
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item key="1" ><Link href='/departments/allDepartments'>Departments</Link></Menu.Item>
      <Menu.Item key="2" ><Link href='/employees/addEmployee'>Add An Employee</Link></Menu.Item>
      <Menu.Item key="2" ><Link href='/departments/addDepartment'>Add A Department</Link></Menu.Item>
      <Menu.Item key="3" onClick={logoutCall}>Logout</Menu.Item>
      
      <Menu.Item key="4" style={{}}>Logged in as:</Menu.Item>
  
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
    {children}
    </Content>
    <Footer style={{ textAlign: 'center',position:'absolute',bottom:"0",width:"100%"}}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
);
}