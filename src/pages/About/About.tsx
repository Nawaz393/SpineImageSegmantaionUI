import React from 'react'
import { Layout, Typography, Row, Col, Card, Avatar, Button } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'

const { Content } = Layout
const { Title, Text, Paragraph } = Typography

const About: React.FC = () => {
  return (
    <Layout className="min-h-screen rounded">
      <Content className="bg-gray-50">
        <div className="container mx-auto py-12 px-4">
          <Row justify="center" className="mb-12">
            <Col span={24}>
              <Title level={1} className="text-center text-blue-600">
                About Us
              </Title>
              <Paragraph className="text-center text-lg text-gray-700">
                We are dedicated to providing state-of-the-art CT image
                segmentation solutions. Our team of experts leverages advanced
                algorithms to deliver accurate and efficient results.
              </Paragraph>
            </Col>
          </Row>

          <Row gutter={[32, 32]} className="mb-12">
            <Col span={24} md={12}>
              <Card className="shadow-lg">
                <Title level={2} className="text-blue-600">
                  Our Mission
                </Title>
                <Paragraph>
                  Our mission is to revolutionize medical imaging by providing
                  cutting-edge 2D and 3D segmentation tools. We aim to enhance
                  the diagnostic capabilities of healthcare professionals
                  through precise and reliable technology.
                </Paragraph>
              </Card>
            </Col>
            <Col span={24} md={12}>
              <Card className="shadow-lg">
                <Title level={2} className="text-blue-600">
                  Our Vision
                </Title>
                <Paragraph>
                  Our vision is to be the leading provider of CT image
                  segmentation solutions, setting the standard for accuracy,
                  efficiency, and ease of use. We strive to make advanced
                  medical imaging accessible to all.
                </Paragraph>
              </Card>
            </Col>
          </Row>

          <Row justify="center" className="mb-12">
            <Col span={24}>
              <Title level={2} className="text-center text-blue-600">
                Meet the Team
              </Title>
            </Col>
          </Row>
          <Row gutter={[16, 16]} justify="center">
            <Col span={24} sm={12} md={8} lg={6}>
              <Card className="shadow-lg">
                <Card.Meta
                  avatar={<Avatar size={64} icon={<UserOutlined />} />}
                  title="Jane Doe"
                  description="Chief Executive Officer"
                />
                <Paragraph className="text-center mt-2">
                  Jane leads our team with over 20 years of experience in
                  medical imaging and healthcare technology.
                </Paragraph>
              </Card>
            </Col>
            <Col span={24} sm={12} md={8} lg={6}>
              <Card className="shadow-lg">
                <Card.Meta
                  avatar={<Avatar size={64} icon={<UserOutlined />} />}
                  title="John Smith"
                  description="Chief Technology Officer"
                />
                <Paragraph className="text-center mt-2">
                  John is the brains behind our technology, with a deep
                  expertise in algorithm development and machine learning.
                </Paragraph>
              </Card>
            </Col>
            <Col span={24} sm={12} md={8} lg={6}>
              <Card className="shadow-lg">
                <Card.Meta
                  avatar={<Avatar size={64} icon={<UserOutlined />} />}
                  title="Emily Johnson"
                  description="Lead Developer"
                />
                <Paragraph className="text-center mt-2">
                  Emily drives our software development, ensuring our solutions
                  are robust, scalable, and user-friendly.
                </Paragraph>
              </Card>
            </Col>
          </Row>

          <Row justify="center" className="mt-12">
            <Col span={24}>
              <Title level={2} className="text-center text-blue-600">
                Contact Us
              </Title>
              <Paragraph className="text-center text-lg text-gray-700">
                Have any questions or need support? Get in touch with us!
              </Paragraph>
              <div className="text-center mt-4">
                <Button
                  type="link"
                  href="mailto:mohdnawaz6393@gmail.com"
                  icon={<MailOutlined />}
                  className="mx-2"
                >
                  Email Us
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  )
}

export default About
