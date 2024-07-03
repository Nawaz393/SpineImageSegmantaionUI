import React from 'react'
import { Row, Col, Typography, Card, Button, Divider } from 'antd'
import mainImage from '../../assets/mainImage.jpg'
import spin3D from '../../assets/Spine3d.jpg'
import spine2D from '../../assets/Spine2d.jpg'
import visual3D from '../../assets/visual3d.png'
import { useNavigate } from 'react-router-dom'
const { Title, Text } = Typography

const Home: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
      <Row gutter={[16, 16]} justify="center" align="middle">
        <Col span={24}>
          <Title
            level={2}
            style={{ textAlign: 'center' }}
            className="font-poppins"
          >
            Welcome to Scan View
          </Title>
        </Col>

        <Col span={24}>
          <img
            src={mainImage}
            alt="CT Image Segmentation"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '450px',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
        </Col>

        <Col span={24}>
          <Title level={2} style={{ textAlign: 'center' }}>
            Advanced 2D and 3D Image Segmentation
          </Title>
          <Text
            style={{
              textAlign: 'center',
              display: 'block',
              marginBottom: '24px',
            }}
          >
            Our cutting-edge platform provides state-of-the-art tools for CT
            image segmentation in both 2D and 3D. Visualize and analyze your
            medical images with ease and accuracy.
          </Text>
        </Col>

        <Divider />

        <Col span={8}>
          <Card
            hoverable
            cover={
              <img
                alt="example"
                src={spine2D}
                style={{
                  maxHeight: '260px',
                  objectFit: 'cover',
                }}
              />
            }
            onClick={() => {
              navigate('/segmant2d')
            }}
          >
            <Card.Meta
              title="2D Image Segmentation"
              description="Efficient and accurate segmentation of 2D CT images for various medical applications."
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            hoverable
            cover={
              <img
                alt="Spine 3d image"
                src={spin3D}
                style={{
                  maxHeight: '260px',
                  objectFit: 'cover',
                }}
              />
            }
            onClick={() => {
              navigate('/segmant3d')
            }}
          >
            <Card.Meta
              title="3D Image Segmentation"
              description="Advanced 3D segmentation techniques for comprehensive image analysis."
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            hoverable
            cover={
              <img
                alt="example"
                src={visual3D}
                style={{
                  maxHeight: '270px',
                  objectFit: 'cover',
                }}
              />
            }
            onClick={() => {
              navigate('/segmant3d')
            }}
          >
            <Card.Meta
              title="Visualization Tools"
              description="Interactive tools to visualize and manipulate segmented images."
            />
          </Card>
        </Col>

        <Col span={24} style={{ textAlign: 'center', marginTop: '24px' }}>
          <Button type="primary" size="large" href="/login">
            Get Started
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Home
