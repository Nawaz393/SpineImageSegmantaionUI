import { loginType } from '../../pages/Login/login.dto'
import { Siguptype } from '../../pages/signup/signup.dto'
import { APP_API, handleApiError } from '../actions/utils'
export const signIn = async (data: loginType) => {
  try {
    const res = await APP_API.post('/auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('res', res)
    return { error: null, data: res.data }
  } catch (error) {
    console.log(error)
    return handleApiError(error)
  }
}

export const signUp = async (data:Siguptype ) => {
  try {
    const res = await APP_API.post('/auth/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return { error: null, data: res.data }
  } catch (error: any) {
    console.log(error)
    return handleApiError(error)
  }
}
