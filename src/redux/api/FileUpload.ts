import { MODEL_API, handleApiError } from '../actions/utils'

export const uploadVolume = async (data: FormData) => {
  try {
    const res = await MODEL_API.post('/uploadvolume', data)
    console.log(res.data)
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}
