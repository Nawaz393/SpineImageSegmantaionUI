import { actionType, authState } from './types'

const initialState: authState = {
  accessToken: null,
  error: null,
}

const authReducer = (state: authState = initialState, action: actionType) => {
  const { type, payload } = action
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        accessToken: payload.token,
      }

    case 'LOGOUT':
      return {
        ...state,
        accessToken: null,
      }

    case 'ERROR':
      return {
        ...state,
        error: payload.error,
      }

    default:
      return state
  }
}

export default authReducer
