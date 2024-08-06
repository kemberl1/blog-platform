import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import showSuccessNotification from '../../utils/notifications/showSuccessNotification'
import { setUser, logout } from '../../redux/userSlice'
import Header from '../Header/Header'
import AuthNotification from '../AuthNotification/AuthNotification'
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton'

const hasShownSignInSuccess = () => {
  const shown = localStorage.getItem('signInSuccessShown')
  return shown === 'true'
}

const setSignInSuccessShown = () => {
  localStorage.setItem('signInSuccessShown', 'true')
}

function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedInUser = useSelector((state) => state.user.user)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const { user, token } = JSON.parse(userData)
      dispatch(setUser({ user, token }))
      if (!hasShownSignInSuccess()) {
        showSuccessNotification('signInSuccess', user.username)
        setSignInSuccessShown()
      }
    }
  }, [dispatch])

  const handleSignOut = () => {
    dispatch(logout())
    localStorage.removeItem('user')
    localStorage.removeItem('signInSuccessShown')
    showSuccessNotification('logOutSuccess')
    navigate('/sign-in', { replace: true })
  }

  return (
    <div className="layout">
      <AuthNotification />
      <Header user={loggedInUser} onSignOut={handleSignOut} />
      <main className="main-content">
        <ScrollToTopButton/>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout