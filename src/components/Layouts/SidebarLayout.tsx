import { Layout } from 'antd'
import {
  AlignLeftOutlined,
 
} from '@ant-design/icons'
import  { ReactNode, useState } from 'react'
import TopNavBar from '../Navbar/TopNavBar'
import NavDrawer from '../Navbar/NavDrawer'
import LeftSideBar from '../Navbar/LeftSideBar'

const { Header, Content } = Layout

const SidebarLayout:React.FC<{children:ReactNode}> = ({children}) => {
  const [showDrawer, setShowDrawer] = useState(false)


  const toggleDrawer = () => {
    setShowDrawer(!showDrawer)
  }


  return (
    <Layout className="min-h-screen min-w-screen">
      <Header style={{ backgroundColor: '#fff', padding: 0 }}>
        <div className="logo" />
        <AlignLeftOutlined
          className="text-2xl font-extrabold md:hidden px-5 "
          onClick={toggleDrawer}
        />
        <TopNavBar/>
      </Header>
      <NavDrawer show={showDrawer} toggle={toggleDrawer}/>
      
      <Layout>
     <LeftSideBar/>
        <Content
          style={{
            padding: 24,
            margin: 0,
            background: '#f0f0f0',
            borderRadius: 10,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default SidebarLayout
