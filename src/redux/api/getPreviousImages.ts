import { APP_API, handleApiError } from '../actions/utils'

export const getPreviousImages = async () => {
  try {
    const res = await APP_API.get('image/getPreviousImages')
    return { error: null, data: res.data }
  } catch (error) {
    console.log(error)
    return handleApiError(error)
  }
}
