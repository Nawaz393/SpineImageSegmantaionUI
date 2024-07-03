import {
  Avatar,
  Card,
  Flex,
  GetProp,
  Typography,
  Upload,
  UploadProps,
} from 'antd'

import Meta from 'antd/es/card/Meta'
import { EditFilled, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import UpdatePersonalInfo from './UpdatePersonalInfo'
import { ToastContainer, toast } from 'react-toastify'
import { getProfile } from '../../redux/api/userInfoApi'

import { APP_API, BASE_APP_URL } from '../../redux/actions/utils'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const PersonalInfo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [Info, setInfo] = useState({
    name: '',
    speciality: '',
    country: '',
    email: '',
    profileImage: '',
  })

  const [reload, setReload] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    ;(async () => {
      const res = await getProfile()

      if (res.error) {
        toast.error(res.error)
      }
      console.log(res.data)
      setInfo(res.data)
    })()
  }, [reload])

  const customImageUploadRequest = async (options: any) => {
    const data = new FormData()
    data.append('profileImage', options.file)
    try {
      setLoading(true)
      const res = await APP_API.post('/user/uploadProfileImage', data)
      if (res.data) {
        toast.success(res.data.message)
      }
      options.onSuccess('Ok')
      setReload(!reload)
    } catch (error) {
      console.log(error)
      toast.error('Error uploading file')
    } finally {
      setLoading(false)
    }
  }

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      toast.error('You can only upload JPG/PNG file!')
    }

    return isJpgOrPng
  }
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )
  return (
    <Card title="Personal Information" className="h-5/6 m-auto w-5/6 md:w-2/3">
      <ToastContainer />

      {Info.profileImage ? (
        <Meta
          avatar={
            <Avatar
              src={`${BASE_APP_URL}/${Info.profileImage}`}
              className="h-20 w-20 md:w-24 md:h-24"
            />
          }
        />
      ) : (
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          customRequest={customImageUploadRequest}
          beforeUpload={beforeUpload}
        >
          {uploadButton}
        </Upload>
      )}
      <Flex vertical className="my-5">
        <Typography.Text className="font-poppins mb-4">
          <span className="text-md font-semibold mr-10"> Full Name </span>
          {Info?.name}
        </Typography.Text>
        <Typography.Text className="font-poppins mb-4">
          <span className="text-md font-semibold mr-10"> Speciality </span>
          {Info?.speciality}
        </Typography.Text>
        <Typography.Text className="font-poppins mb-4">
          <span className="text-md font-semibold mr-16"> Email </span>
          {Info?.email}
        </Typography.Text>
        <Typography.Text className="font-poppins mb-4">
          <span className="text-md font-semibold mr-11"> Country </span>
          {Info?.country}
        </Typography.Text>
        <EditFilled
          className="text-xl ml-auto mt-6  cursor-pointer"
          onClick={handleOpen}
        />

        <UpdatePersonalInfo
          isOpen={isOpen}
          handleClose={handleClose}
          Info={{
            name: Info?.name,
            speciality: Info?.speciality,
            country: Info?.country,
          }}
          setReload={() => setReload(!reload)}
        />
      </Flex>
    </Card>
  )
}

export default PersonalInfo
