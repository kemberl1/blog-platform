import { toast } from 'react-toastify'

const showSuccessNotification = (successType, user = 'guest') => {
  let message

  const notificationStyle = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  switch (successType) {
    case 'signUpSuccess':
      message = `Welcome, ${user}!`
      break
    case 'signInSuccess':
      message = `Welcome back, ${user}!`
      break
    case 'logOutSuccess':
      message = 'You have successfully logged out.'
      break
    case 'createArticleSuccess':
      message = 'Your article has been created.'
      break
    case 'editArticleSuccess':
      message = 'Your article has been updated.'
      break
    case 'deleteArticleSuccess':
      message = 'Your article has been deleted.'
      break
    case 'updateProfileSuccess':
      message = 'Your profile has been updated.'
      break
    default:
      break
  }

  toast.success(message, notificationStyle)
}

export default showSuccessNotification
