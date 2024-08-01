import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RequireAuth({ children }) {
  const location = useLocation()
  const user = useSelector((state) => state.user.user)
  console.log('user из requier auth: ', user)
  if (user) {
    return children
  }

  return <Navigate to="/sign-in" state={{ from: location }} replace />
}
export default RequireAuth
