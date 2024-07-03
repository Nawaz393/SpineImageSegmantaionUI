import axios from 'axios'

export const isValidFileType = (file: any) => {
  const allowedTypes = ['nii', 'nii.gz']
  const fileName = file.name
  const fileType = fileName.split('.')
  if (fileType.length === 3) {
    console.log(fileType.slice(1, 3).join('.').toLowerCase())
    if (!allowedTypes.includes(fileType.slice(1, 3).join('.').toLowerCase())) {
      return false
    }
  } else if (fileType.length === 2) {
    console.log(fileType[1].toLowerCase())
    if (!allowedTypes.includes(fileType[1].toLowerCase())) {
      return false
    }
  }
  return true
}

export const customFileUploadRequest = async (
  file: any,
  onSuccess: any,
  onError: any,
) => {
  try {
    const data = new FormData()
    data.append('file', file)
    const res = await axios.post('http://localhost:5000/uploadvolume', data)
    console.log(res)
    if (onSuccess) {
      onSuccess('Ok')
    }
    return res.data
  } catch (error) {
    if (onError) {
      onError(error)
    }
    return null
  }
}
