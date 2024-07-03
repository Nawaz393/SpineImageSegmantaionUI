import { Flex, Typography } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import { Link } from 'react-router-dom'

const CustomFooter = () => {
  return (
    <Footer
      style={{
        height: '30vh',
      }}
    >
      <Flex justify="space-between">
        <Flex vertical>
          <Typography.Title level={4}>Scan View</Typography.Title>
          <Typography.Text>Your Trusted Medical image Platform</Typography.Text>
          <Typography.Text>
            Scan View @ {new Date().getFullYear()}
          </Typography.Text>
        </Flex>

        <Flex vertical>
          <Typography.Text>
            <a href="mailto:mohdnawaz6393@gmail.com">Help</a>
          </Typography.Text>
          <Typography.Text>
            {' '}
            <Link to="/faqs">FAQ</Link>
          </Typography.Text>
          <Typography.Text>
            {' '}
            <a href="mailto:mohdnawaz6393@gmail.com">Contact Support</a>
          </Typography.Text>
          <Typography.Text>
            {' '}
            <Link to="/feedback">Feedback</Link>
          </Typography.Text>
        </Flex>
      </Flex>
    </Footer>
  )
}

export default CustomFooter
