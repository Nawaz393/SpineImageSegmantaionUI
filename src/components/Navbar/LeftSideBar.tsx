import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useState } from 'react'
import { sideBarData } from './SideBarData'
import Item from 'antd/es/list/Item'
import { UserOutlined } from '@ant-design/icons'

const LeftSideBar = () => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      collapsedWidth={40}
      width={200}
      style={{ backgroundColor: '#f0f0f0' }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        items={sideBarData}
      >
   
      </Menu>
    </Sider>
  )
}

export default LeftSideBar
