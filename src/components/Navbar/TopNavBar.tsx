import { Menu } from 'antd'
import { topNavData } from './TopNavData'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TopNavBar = () => {
  const { Item } = Menu

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const menuItems = topNavData.map((item, index) =>
    isLoggedIn && index != topNavData.length - 1 ? (
      <Item key={item.key}>{item.label}</Item>
    ) : isLoggedIn ? (
    <Item key="dashboard" className="float-right">
        <Link to="/dashboard">Dashboard</Link>
      </Item>
    ) : (
      <Item key={item.key} className="float-right">
        {item.label}
      </Item>
    ),
  )

  return (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['home']}
      className="hidden md:block px-16"
    >
      {menuItems}
    </Menu>
  )
}

export default TopNavBar
