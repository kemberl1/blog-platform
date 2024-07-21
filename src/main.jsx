import ReactDOM from 'react-dom/client'
import { Offline, Online } from 'react-detect-offline'
import React from 'react'

import './styles/main.scss'
import ErrorIndicator from './components/Error/ErrorIndicator/ErrorIndicator'
import ErrorMessages from './components/Error/ErrorMessages/ErrorMessages'
import App from './components/App/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Online>
      <App />
    </Online>
    <Offline>
      <ErrorIndicator message={ErrorMessages.NETWORK_ERROR} />
    </Offline>
  </React.StrictMode>
)
