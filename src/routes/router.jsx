import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import ArticlesPage from '../pages/ArticlesPage'
import SingleArticlePage from '../pages/SingleArticlePage'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import EditProfilePage from '../pages/EditProfilePage'

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
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: 'profile/edit',
        element: <EditProfilePage />,
      },
    ],
  },
])

export default router
