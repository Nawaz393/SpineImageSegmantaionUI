import { Dispatch } from '@reduxjs/toolkit'

import { NavigateFunction } from 'react-router-dom'

import { signIn, signUp } from '../api/authApi'
import { loginType } from '../../pages/Login/login.dto'
import { Siguptype } from '../../pages/signup/signup.dto'

export const logout =
  (navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    dispatch({
      type: 'LOGOUT',
    })
    localStorage.removeItem('token')
    navigate('/signin')
  }

export const loginAction =
  (data: loginType, navigate: NavigateFunction) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await signIn(data)

      if (response.error) {
        dispatch({
          type: 'ERROR',
          payload: response,
        })
      } else {
        dispatch({
          type: 'LOGIN',
          payload: response,
        })
        navigate('/dashboard')
        localStorage.setItem('token', JSON.stringify(response.data.token))
      }
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: { error: 'An unexpected error occurred.' },
      })
    }
  }

export const signupAction =
  (data: Siguptype, navigate: NavigateFunction) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await signUp(data)
      if (response.error) {
        dispatch({
          type: 'ERROR',
          payload: response,
        })
      } else {
        dispatch({
          type: 'LOGIN',
          payload: response,
        })
        localStorage.setItem('token', JSON.stringify(response.data.token))
        navigate('/dashboard')
      }
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: { error: 'An unexpected error occurred.' },
      })

      console.log(error)
    }
  }
