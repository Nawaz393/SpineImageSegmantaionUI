import React, { useState } from 'react'
import { Upload, Form, Input, Typography } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import { CustomButton } from '../../components'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { segment2dApi } from '../../redux/api/segmantationApi'
import { createSearchParams, useNavigate } from 'react-router-dom'

const Segmant2d: React.FC = () => {
  const [imageName, setImageName] = useState<string>()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const [form] = Form.useForm()
  const onFinish = async () => {
    try {
      setIsLoading(true)
      console.log(name, description, imageName)
      const res = await segment2dApi({
        name: name,
        description: description,
        imageName: imageName,
      })
      console.log(res)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success('Mask Exracted successfully')
        const id = res.data.id
        navigate(`../visualize2d?id=${id}`,{replace:true})
      }
    } catch (error) {
      console.log(error)
      toast.error('Error uploading file')
    } finally {
      onReset()
      setIsLoading(false)
    }
  }

  const beforeUpload = (file: any) => {
    console.log(file.type)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'] // Replace with your allowed types
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      toast.error(`${file.name} is not a supported file type.`)
      return Upload.LIST_IGNORE // Prevent upload if invalid
    }
    return true
  }

  const customImageUploadRequest = async (options: any) => {
    const data = new FormData()
    data.append('file', options.file)
    try {
      const res = await axios.post('http://localhost:5000/uploadimage', data)
      console.log(res)
      setImageName(res.data.fileName)
      options.onSuccess('Ok')
    } catch (error) {
      console.log(error)
      toast.error('Error uploading file')
      options.onError(error)
    }
  }

  const onReset = () => {
    form.resetFields()
    setName('')
    setDescription('')
    setImageName('')
  }

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <ToastContainer />
      <Typography.Title level={4}>Segmant 2D</Typography.Title>
      <div className="grid md:grid-cols-2  ">
        <div className="pt-7">
          <Form.Item
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
          >
            <Upload.Dragger
              maxCount={1}
              height={280}
              listType="picture"
              accept="image/jpeg, image/png, image/jpg"
              beforeUpload={beforeUpload}
              customRequest={customImageUploadRequest}
            >
              <p className="ant-upload-drag-icon">
                {' '}
                <CloudUploadOutlined
                  style={{
                    fontSize: '20px',
                    paddingRight: '10px',
                  }}
                />{' '}
                Drag & Drop
              </p>
              <p className="ant-upload-text">Click to upload</p>
            </Upload.Dragger>
          </Form.Item>
        </div>
        <div className="md:w-5/6 md:pl-20">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input
              size="large"
              placeholder="Name"
              value={name}
              name="name"
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
          >
            <Input.TextArea
              size="large"
              placeholder="description about scan"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />
          </Form.Item>
          <Form.Item>
            <CustomButton
              content={isLoading ? 'Segmanting...' : 'Segmant'}
              htmlType="submit"
              className="w-full"
              disabled={isLoading}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}

export default Segmant2d
