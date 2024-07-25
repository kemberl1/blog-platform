import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../redux/userSlice'
import Header from '../Header/Header'

function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)
  const location = useLocation()

  const handleSignOut = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className="layout">
      <Header user={user} onSignOut={handleSignOut} />
      <section className="main-content">
        <Outlet />
      </section>
    </div>
  )
}

export default Layout
