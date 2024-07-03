import { APP_API, handleApiError } from '../actions/utils'

export type ChangePasswordData = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
export const changePassword = async (data: ChangePasswordData) => {
  try {
    const res = await APP_API.post('user/updatePassword', data)
    return { error: null, data: res.data }
  } catch (error) {
    console.log(error)
    return handleApiError(error)
  }
}
