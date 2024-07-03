import {
  CopyOutlined,
  FileImageOutlined,
  LogoutOutlined,
  SecurityScanOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const Logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/'
}

export const sideBarData = [
  {
    key: 'dashoard',
    label: <Link to={'/dashboard'}>User Information</Link>,
    icon: <UserOutlined />,
  },

  {
    key: 'segmant2d',
    label: <Link to={'/segmant2d'}>Segmant 2D</Link>,
    icon: <FileImageOutlined />,
  },
  {
    key: 'segmant3d',
    label: <Link to={'/segmant3d'}>Segmant 3D</Link>,
    icon: <CopyOutlined />,
  },
  {
    key: 'Recent uploads',
    label: <Link to={'/previousuploads'}>Recent Uploads</Link>,
    icon: <UploadOutlined />,
  },
  {
    key: 'security',
    label: <Link to={'/security'}>Security</Link>,
    icon: <SecurityScanOutlined />,
  },

  {
    key: 'logout',
    label: <button onClick={Logout}>Logout</button>,
    icon: <LogoutOutlined />,
  },

]
