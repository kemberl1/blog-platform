import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useDeleteArticleMutation, useLikeArticleMutation, useUnlikeArticleMutation } from '../redux/ApiSlice'
import showErrorNotification from '../utils/notifications/showErrorNotification'
import showSuccessNotification from '../utils/notifications/showSuccessNotification'

const useArticleActions = () => {
  const navigate = useNavigate()
  const [deleteArticle] = useDeleteArticleMutation()
  const [likeArticle] = useLikeArticleMutation()
  const [unlikeArticle] = useUnlikeArticleMutation()
  const user = useSelector((state) => state.user.user)

  const handleLike = async (slug, refetch) => {
    if (!user) {
      showErrorNotification('authError', 'warning')
      return
    }
    try {
      await likeArticle(slug).unwrap()
      refetch()
    } catch (e) {
      showErrorNotification('likeError', 'error')
    }
  }

  const handleUnlike = async (slug, refetch) => {
    if (!user) {
      showErrorNotification('authError', 'warning')
      return
    }
    try {
      await unlikeArticle(slug).unwrap()
      refetch()
    } catch (e) {
      showErrorNotification('unlikeError', 'warning')
    }
  }

  const handleDelete = async (slug) => {
    if (!user) {
      showErrorNotification('authError', 'warning')
      return
    }
    try {
      await deleteArticle(slug).unwrap()
      showSuccessNotification('deleteArticleSuccess')
      navigate('/', { replace: true })
    } catch (e) {
      if (e.originalStatus === 403) {
        showErrorNotification('authDeleteError', 'error')
      } else {
        showErrorNotification('defaultDeleteError', 'error')
      }
    }
  }

  const handleEditClick = (slug) => {
    navigate(`/articles/${slug}/edit`)
  }

  return { handleLike, handleUnlike, handleDelete, handleEditClick }
}

export default useArticleActions
