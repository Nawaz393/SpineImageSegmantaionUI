import {
  HomeOutlined,
  InfoCircleOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const topNavData = [
  {
    key: 'home',

    label: <Link to={'/'}> Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: 'feature',
    label: <Link to={'/features'}> Features</Link>,
    icon: <StarOutlined />,
  },
  {
    key: 'about',
    label: <Link to={'/about'}> About</Link>,
    icon: <InfoCircleOutlined />,
  },

  {
    key:'login',
    label:<Link to={'/login'}>Login</Link>,
    
  }

]
