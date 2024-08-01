import { toast } from 'react-toastify'

const showErrorNotification = (error, style) => {
  let message

  const notificationStyle = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  switch (error) {
    case 'authError':
      message = 'Please sign in or sign up for this action.'
      break
    case 'articleEditError':
      message = 'You can edit this article only if you are the author.'
      break
    case 'likeError':
      message = 'Failed to like article'
      break
    case 'unlikeError':
      message = 'Failed to unlike article.'
      break
    case 'authDeleteError':
      message = 'You can edit this article only if you are the author.'
      break
    case 'defaultDeleteError':
      message = 'Failed to delete article.'
      break
    default:
      message = 'An error occurred while performing the action. Try again later.'
      break
  }

  if (style === 'error') {
    toast.error(message, notificationStyle)
  } else {
    toast.warning(message, notificationStyle)
  }
}

export default showErrorNotification
