import React, { useEffect } from 'react'
import {
  Layout,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  message,
} from 'antd'
import emailjs from '@emailjs/browser'
const { Content } = Layout
const { Title, Paragraph } = Typography
const { TextArea } = Input

const FeedbackForm: React.FC = () => {
  const [form] = Form.useForm()

  useEffect(() => {
    emailjs.init('MLxqA4ltLMSOQft_L')
  }, [])

  const onFinish = async (values: any) => {
    const templateId = 'template_7d2cola'
    const serviceId = 'service_g1zu4qn'

    console.log(values)
    console.log({
        name: values.name,
        email: values.email,
        desc: values.feedback,
      })
    const res = await emailjs.send(serviceId, templateId, {
      name: values.name,
      email: values.email,
      desc: values.feedback,
    })
    if (res.status === 200) {
      message.success('Thank you for your feedback!')
    } else {
      message.error('failed submitting your feedback')
    }

    form.resetFields()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    message.error('Please fill in the required fields.')
  }

  return (
    <Layout className="min-h-screen ">
      <Content>
        <div className="container mx-auto py-16 px-8">
          <Row justify="center" className="mb-16">
            <Col span={24}>
              <Title level={1} className="text-center font-bold text-5xl">
                Feedback Form
              </Title>
              <Paragraph className="text-center text-xl mt-4">
                We value your feedback. Please let us know your thoughts and
                suggestions to help us improve our service.
              </Paragraph>
            </Col>
          </Row>

          <Row justify="center">
            <Col span={24} md={12}>
              <Form
                form={form}
                layout="vertical"
                name="feedback_form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: 'Please enter your name!' },
                  ]}
                >
                  <Input placeholder="Your Name" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your email!',
                      type: 'email',
                    },
                  ]}
                >
                  <Input placeholder="Your Email" />
                </Form.Item>

                <Form.Item
                  label="Feedback"
                  name="feedback"
                  rules={[
                    { required: true, message: 'Please enter your feedback!' },
                  ]}
                >
                  <TextArea rows={4} placeholder="Your Feedback" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="bg-blue-600 hover:bg-blue-700 border-none"
                  >
                    Submit Feedback
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  )
}

export default FeedbackForm
