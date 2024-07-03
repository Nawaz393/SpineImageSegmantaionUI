import React, { useState } from 'react'
import { Upload, Form, Input, Typography } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import { CustomButton } from '../../components'
import { ToastContainer, toast } from 'react-toastify'
import { customFileUploadRequest, isValidFileType } from './helpers'
import { segment3dApi } from '../../redux/api/segmantationApi'
import { useNavigate } from 'react-router-dom'

const Segmant3d: React.FC = () => {
  const [form] = Form.useForm()
  const [imageName, setImageName] = useState<any>()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const onFinish = async () => {
    try {
      setIsLoading(true)
      if (imageName === '') {
        toast.error('Please upload correct format image ')
        return
      }
      const res = await segment3dApi({
        name: name,
        description: description,
        imageName: imageName,
      })
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success('Mask Extracted Sucessfully')
        const id = res.data.id
        navigate(`../visualize3d?id=${id}`, { replace: true })
      }
    } catch (error) {
    } finally {
      onReset()
      setIsLoading(false)
    }
  }

  const onReset = () => {
    form.resetFields()
    setName('')
    setDescription('')
    setImageName('')
  }

  const beforeUpload = (file: any) => {
    return new Promise<void>((resolve, reject) => {
      if (isValidFileType(file)) {
        resolve()
      } else {
        toast.error(`${file.name} is not a supported file type.`)
        reject(false) // Prevent upload if invalid
      }
    })
  }

  const customRequest = async (options: any) => {
    const res = await customFileUploadRequest(
      options.file,
      options.onSuccess,
      options.onError,
    )
    if (!res) {
      toast.error('Error uploading file')
    }
    setImageName(res.fileName)
  }

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <ToastContainer />
      <Typography.Title level={4}>Segmant 3D</Typography.Title>
      <div className="grid md:grid-cols-2  ">
        <div className="pt-7">
          <Form.Item
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
          >
            <Upload.Dragger
              maxCount={1}
              customRequest={customRequest}
              height={280}
              listType="text"
              beforeUpload={beforeUpload}
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
              <p>accepted file is nifti</p>
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
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />
          </Form.Item>
          <Form.Item>
            <CustomButton
              content={isLoading ? 'Segmenting' : 'Segmant'}
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

export default Segmant3d
