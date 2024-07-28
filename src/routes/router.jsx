import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import ArticlesPage from '../pages/ArticlesPage'
import SingleArticlePage from '../pages/SingleArticlePage'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import EditProfilePage from '../pages/EditProfilePage'
import NewArticlePage from '../pages/NewArticlePage'
import EditArticlePage from '../pages/EditArticlePage'

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
        path: 'profile',
        element: <EditProfilePage />,
      },
      {
        path: 'new-article',
        element: <NewArticlePage />,
      },
      {
        path: 'articles/:slug/edit',
        element: <EditArticlePage />,
      },
    ],
  },
])

export default router
