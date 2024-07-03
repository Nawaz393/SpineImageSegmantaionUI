import { InfoType } from '../../pages/PersonalInfo/UpdatePersonalInfo'
import { APP_API, handleApiError } from '../actions/utils'

export const updateProfile = async (data: InfoType) => {
  try {
    const res = await APP_API.post('/user/updateprofile', data)
    console.log(res.data)
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}

export const getProfile = async () => {
    try {
        const res = await APP_API.get('/user/userInfo')
        console.log(res.data)
        return { error: null, data: res.data }
    } catch (error) {
        return handleApiError(error)
    }
    }

