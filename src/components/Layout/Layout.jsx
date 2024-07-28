import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { setUser, logout } from '../../redux/userSlice'
import Header from '../Header/Header'

function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedInUser = useSelector((state) => state.user.user)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const { user, token } = JSON.parse(userData)
      dispatch(setUser({ user, token }))
    }
  }, [dispatch])

  const handleSignOut = () => {
    dispatch(logout())
    localStorage.removeItem('user')
    navigate('/sign-in', { replace: true })
  }

  return (
    <div className="layout">
      <Header user={loggedInUser} onSignOut={handleSignOut} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
