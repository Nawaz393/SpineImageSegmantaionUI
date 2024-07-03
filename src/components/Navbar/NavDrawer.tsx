import { Drawer, Menu } from 'antd'
import { topNavData } from './TopNavData'

type props = {
  show: boolean
  toggle: Function
}
const NavDrawer: React.FC<props> = ({ show, toggle }) => {
  return (
    <Drawer
      title="Menu"
      placement="right"
      onClose={() => {
        toggle()
      }}
      open={show}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['home']}
        style={{ lineHeight: '64px', flex: 1 }}
        onClick={() => {
          toggle()
          console.log(show)
        }}
        items={topNavData}
      >
    
      </Menu>
    </Drawer>
  )
}

export default NavDrawer
