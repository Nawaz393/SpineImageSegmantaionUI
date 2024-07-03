import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

export const BASE_APP_URL = 'http://localhost:3000'
export const BASE_Model_URL = 'http://localhost:5000'

const authInterceptor = (
  req: AxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = JSON.parse(localStorage.getItem('token') || '{}')
  

  if (token) {
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  return req as InternalAxiosRequestConfig
}

export const APP_API = axios.create({
  baseURL: BASE_APP_URL,
})

// Attach the interceptor to Axios
APP_API.interceptors.request.use(authInterceptor)

export const MODEL_API = axios.create({
  baseURL: BASE_Model_URL,
})

// Attach the interceptor to Axios
MODEL_API.interceptors.request.use(authInterceptor)

export const handleApiError = async (error: any) => {
  try {
    
    const errorMessage =
      error.response?.data?.error || 'An unexpected error occurred.'
    const data = null

    return { error: errorMessage, data }
  } catch (err) {
    console.log(err)
    throw new Error('An unexpected error occurred.')
  }
}
