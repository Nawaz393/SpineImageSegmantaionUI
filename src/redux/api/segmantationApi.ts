import { MODEL_API, handleApiError } from '../actions/utils'

export const segment2dApi = async (data: any) => {
  try {
    const res = await MODEL_API.post('/segment2d1', data)
    console.log(res.data)

    return { error: null, data: res.data }
  } catch (error) {
    console.log(error)
    return handleApiError(error)
  }
}

export const segment3dApi = async (data: any) => {
  try {
    const res = await MODEL_API.post('/segment3d1', data)
    console.log(res.data)
    return { error: null, data: res.data }
  } catch (error) {
    console.log(error)
    return handleApiError(error)
  }
}
