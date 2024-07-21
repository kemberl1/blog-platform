import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './styles/main.scss'

import App from './components/App/App'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)