import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import ArticlesPage from '../components/ArticlesList/ArticlesList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ArticlesPage />,
      },
    ],
  },
])

export default router
