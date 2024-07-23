import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import ArticlesPage from '../pages/ArticlesPage'
import SingleArticlePage from '../pages/SingleArticlePage'

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
      {
        path: 'articles/:slug',
        element: <SingleArticlePage />,
      },
    ],
  },
])

export default router
