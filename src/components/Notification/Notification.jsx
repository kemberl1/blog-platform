// NotificationComponent.js
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notification } from 'antd'
import { Link } from 'react-router-dom'

import { clearNotification } from '../../redux/notificationSlice'

function NotificationComponent() {
  const dispatch = useDispatch()
  const notificationState = useSelector((state) => state.notifications)

  useEffect(() => {
    if (notificationState.message) {
      notification[notificationState.type]({
        message: notificationState.message,
        description: (
          <span>
            Please <Link to="/sign-in">sign in</Link> or <Link to="/sign-up">sign up</Link> to like the article.
          </span>
        ),
        placement: 'top',
        onClose: () => dispatch(clearNotification()),
      })
    }
  }, [notificationState, dispatch])

  return null
}

export default NotificationComponent
