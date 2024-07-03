import { Flex, Form, Input, Typography } from 'antd'
import { CustomButton } from '../../components'
import { loginType } from './login.dto'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../redux/actions/authActions'
import { useForm } from 'antd/es/form/Form'
import { ToastContainer, toast } from 'react-toastify'

const Login: React.FC = () => {
  const [form] = useForm()
  const [LoginData, setLoginData] = useState<loginType>({
    email: '',
    password: '',
  })

  const { error } = useSelector((state: any) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async () => {
    console.log(LoginData)
    await dispatch(loginAction(LoginData, navigate) as any)

    if (error) {
      toast.error(error)
    } else {
      reset()
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }
  }, [])

  const onFinishFailed = (errorInfo: any) => {
    let errorMessages: string[] = []
    errorInfo.errorFields.forEach((item: any) => {
      errorMessages.push(item.errors)
    })
    toast.error(errorMessages.join(','))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...LoginData,
      [e.target.name]: e.target.value,
    })
  }

  const reset = () => {
    form.resetFields()
    LoginData.email = ''
    LoginData.password = ''
  }
  return (
    <Flex vertical align="center" justify="center">
      <ToastContainer />
      <Form
        name="login-form"
        style={{
          width: 400,
          padding: 20,
          paddingTop: 3,
          height: 450,
        }}
        form={form}
        layout="vertical"
        className="shadow-sm border-2 border-gray-200  rounded-lg  flex flex-col justify-center"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item>
          {' '}
          <Typography.Title level={2}>Sign in</Typography.Title>
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email',
              type: 'email',
            },
          ]}
        >
          <Input
            placeholder="Email"
            size="large"
            autoFocus
            name="email"
            onChange={handleChange}
            value={LoginData.email}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'please input your password',
              type: 'string',
              min: 6,
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            type="password"
            name="password"
            onChange={handleChange}
            value={LoginData.password}
          />
        </Form.Item>
        <Form.Item>
          <CustomButton htmlType="submit" content="Sign in" />
        </Form.Item>

        <Form.Item>
          <Typography.Text>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography.Text>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default Login
