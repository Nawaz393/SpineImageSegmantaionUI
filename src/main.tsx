import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import createStore from './redux/store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

const store = createStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
