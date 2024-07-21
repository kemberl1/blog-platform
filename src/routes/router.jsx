import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import ArticlesPage from '../pages/ArticlesPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ArticlesPage />,
      },
      {
        path: 'articles',
        element: <ArticlesPage />,
      },
    ],
  },
])

export default router
