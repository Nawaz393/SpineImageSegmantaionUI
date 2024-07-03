import React from 'react'
import { Row, Col, Card, Typography, Space, Divider } from 'antd'
import {
  AppstoreAddOutlined,
  UserOutlined,
  LockOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const featuresData = [
  {
    icon: (
      <AppstoreAddOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
    ),
    title: '2D Segmentation',
    description: 'Accurate 2D image segmentation for CT scans.',
    details:
      'Our 2D segmentation tool provides precise delineation of anatomical structures in 2D CT images, facilitating accurate diagnosis and treatment planning.',
  },
  {
    icon: (
      <AppstoreAddOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
    ),
    title: '3D Segmentation',
    description: 'Advanced 3D segmentation support for volumetric data.',
    details:
      'Utilize our 3D segmentation capabilities to analyze volumetric data, offering a comprehensive view of anatomical structures for better clinical insights.',
  },
  {
    icon: <UserOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
    title: 'Authentication',
    description: 'Secure authentication to protect user data.',
    details:
      'We prioritize security with robust authentication mechanisms, ensuring that only authorized users can access sensitive medical data.',
  },
  {
    icon: <LockOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
    title: 'Data Protection',
    description: 'Ensuring privacy and security of patient data.',
    details:
      'Our platform adheres to strict data protection regulations, safeguarding patient information through advanced encryption and security protocols.',
  },
]

const Features = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <Row justify="center" className="text-center mb-10">
        <Col>
          <Title>Our Features</Title>
          <Text>
            Explore the advanced features of our CT image segmentation platform.
          </Text>
        </Col>
      </Row>

      <Row gutter={[32, 32]} justify="center">
        {featuresData.map((feature, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card hoverable bordered={false} className="shadow-lg">
              <Space direction="vertical" align="center">
                {feature.icon}
                <Title level={3}>{feature.title}</Title>
                <Text>{feature.description}</Text>
                <p className="mb-2"></p>
                <Text>{feature.details}</Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Features
