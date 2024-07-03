import React from 'react'
import { Form, Input, Typography } from 'antd'
import { CustomButton } from '../../components'
import { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import { changePassword } from '../../redux/api/changePassword'

const Security: React.FC = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const onFinish = async () => {
    let toast_id
    console.log(formData)
    try {
      toast_id = toast.loading('Changing Password')
      setIsLoading(true)
      const res = await changePassword(formData)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success(res.data.message)
        resetForm()
      }
    } catch (error) {
      toast.error('Error changing password')
    } finally {
      setIsLoading(false)
      toast.dismiss(toast_id)
    }
  }

  const resetForm = () => {
    form.resetFields()
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    toast.error('Form validation failed')
    console.log('Failed:', errorInfo)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="flex justify-center items-center max-h-screen">
      <Form
        form={form}
        name="security-form"
        style={{ width: 400, padding: 20, paddingTop: 40 }}
        layout="vertical"
        className="shadow-sm border-2 border-gray-200 rounded-lg flex flex-col justify-center"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <ToastContainer />
        <Typography.Title level={2}>Change Password</Typography.Title>

        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: 'Please input your old password',
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Old Password"
            name="oldPassword"
            size="large"
            autoFocus
            onChange={handleChange}
            value={formData.oldPassword}
          />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Please input your new password',
            },
          ]}
        >
          <Input.Password
            placeholder="New Password"
            name="newPassword"
            size="large"
            onChange={handleChange}
            value={formData.newPassword}
          />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Please confirm your new password',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('Passwords do not match')
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm New Password"
            name="confirmPassword"
            size="large"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
        </Form.Item>

        <Form.Item>
          <CustomButton
            htmlType="submit"
            content={isLoading ? 'Changing Password' : 'Change Password'}
            className="mt-1"
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Security
