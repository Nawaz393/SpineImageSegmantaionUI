import { Flex, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import { updateProfile } from '../../redux/api/userInfoApi'
import { toast } from 'react-toastify'
type UpdatePersonalInfoProps = {
  isOpen: boolean
  handleClose: () => void
  setReload: () => void
  Info: InfoType
}

export type InfoType = {
  name: string
  speciality: string
  country: string
}

const UpdatePersonalInfo: React.FC<UpdatePersonalInfoProps> = ({
  isOpen,
  handleClose,
  Info,
  setReload,
}) => {
  const [formData, setformData] = React.useState({
    name: '',
    speciality: '',
    country: '',
  })

  useEffect(() => {
    setformData(Info)
  }, [Info])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleUpdate = async () => {
    console.log(formData)

    const res = await updateProfile(formData)
    if (res.error) {
      toast.error(res.error)
    }

    toast.success(res.data.message)

    setReload()
    handleClose()
  }
  return (
    <Modal
      title="Update Personal Information"
      open={isOpen}
      onCancel={handleClose}
      okButtonProps={{
        className: 'bg-blue-500 text-white hover:bg-blue-600',
      }}
      onOk={handleUpdate}
    >
      <Flex vertical gap={10}>
        <Input
          placeholder="Full Name "
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
        <Input
          placeholder="Speciality "
          name="speciality"
          onChange={handleChange}
          value={formData.speciality}
        />
        <Input
          placeholder="Country "
          name="country"
          onChange={handleChange}
          value={formData.country}
        />
      </Flex>
    </Modal>
  )
}

export default UpdatePersonalInfo
