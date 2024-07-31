import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { setUser, logout } from '../../redux/userSlice'
import Header from '../Header/Header'
import AuthNotification from '../AuthNotification/AuthNotification'

function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedInUser = useSelector((state) => state.user.user)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const { user, token } = JSON.parse(userData)
      dispatch(setUser({ user, token }))
      toast.success(`Welcome back ${user.username}!`)
    }
  }, [dispatch])



  const handleSignOut = () => {
    dispatch(logout())
    localStorage.removeItem('user')
    toast.info(`You have successfully loged out. `)
    navigate('/sign-in', { replace: true })

  }

  return (
    <div className="layout">
      <AuthNotification />
      <Header user={loggedInUser} onSignOut={handleSignOut} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
