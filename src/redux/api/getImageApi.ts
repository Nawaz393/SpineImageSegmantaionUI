import { APP_API, handleApiError } from '../actions/utils'

export const getImageData = async (id: string) => {
  try {
    const res = await APP_API.get(`image/getImageData?id=${id}`)
    console.log(res.data)
    return { error: null, data: res.data }
  } catch (error) {
    console.log(error)
    return handleApiError(error)
  }
}
