import React, { useEffect } from 'react'
import { Flex, Form, Input, Typography } from 'antd'
import { CustomButton } from '../../components'
import { useState } from 'react'
import { Siguptype } from './signup.dto'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signupAction } from '../../redux/actions/authActions'
import { ToastContainer, toast } from 'react-toastify'

const Signup: React.FC = () => {
  const [signUpData, setSignUpData] = useState<Siguptype>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [form] = Form.useForm()
  const { error } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async () => {
    console.log(signUpData)
    await dispatch(signupAction(signUpData, navigate) as any)

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

  const reset = () => {
    form.resetFields()

    signUpData.name = ''
    signUpData.email = ''
    signUpData.password = ''
    signUpData.confirmPassword = ''
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Flex vertical align="center" justify="center">
      <Form
        form={form}
        name="signup-form"
        style={{
          width: 400,
          padding: 20,
          paddingTop: 40,
          height: 500,
        }}
        layout="vertical"
        className="shadow-sm border-2 border-gray-200  rounded-lg  flex flex-col justify-center"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <ToastContainer />
        <Typography.Title level={2}>Sign up</Typography.Title>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message:
                signUpData.name.length < 0
                  ? 'Please input your name'
                  : 'Name must be at least 3 characters',
              type: 'string',
              min: 3,
            },
          ]}
        >
          <Input
            name="name"
            placeholder="Name"
            size="large"
            autoFocus
            onChange={handleChange}
            value={signUpData.name}
          />
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
            name="email"
            size="large"
            autoFocus
            onChange={handleChange}
            value={signUpData.email}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message:
                signUpData.password.length < 0
                  ? 'please input your password'
                  : 'Password must be at least 8 characters',
              type: 'string',
              min: 8,
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            name="password"
            size="large"
            type="password"
            onChange={handleChange}
            value={signUpData.password}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  'password and confirm password do not match!',
                )
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={signUpData.confirmPassword}
          />
        </Form.Item>
        <Form.Item>
          <CustomButton htmlType="submit" content="Sign up" className="mt-1" />
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default Signup
