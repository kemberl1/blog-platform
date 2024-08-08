import React from 'react'
import { Offline, Online } from 'react-detect-offline'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import ErrorMessages from './components/Error/ErrorMessages/ErrorMessages'
import ErrorIndicator from './components/Error/ErrorIndicator/ErrorIndicator'
import './styles/main.scss'
import App from './components/App/App'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Online>
        <App />
      </Online>
      <Offline>
        <ErrorIndicator message={ErrorMessages.NETWORK_ERROR} />
      </Offline>
    </React.StrictMode>
  </Provider>
)
