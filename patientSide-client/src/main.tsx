import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './config/Redux/store'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './util/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      </BrowserRouter>
    </PersistGate>
  </Provider>

)
