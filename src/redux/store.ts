import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  })

  return store
}

export default createStore
