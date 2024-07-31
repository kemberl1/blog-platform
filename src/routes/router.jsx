import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import ArticlesPage from '../pages/ArticlesPage'
import SingleArticlePage from '../pages/SingleArticlePage'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import EditProfilePage from '../pages/EditProfilePage'
import NewArticlePage from '../pages/NewArticlePage'
import EditArticlePage from '../pages/EditArticlePage'
import RequireAuth from '../hoc/RequireAuth'

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
        element: (
          <RequireAuth>
            <EditProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: 'new-article',
        element: (
          <RequireAuth>
            <NewArticlePage />
          </RequireAuth>
        ),
      },
      {
        path: 'articles/:slug/edit',
        element: (
          <RequireAuth>
            <EditArticlePage />
          </RequireAuth>
        ),
      },
    ],
  },
])

export default router
