import { useNavigate } from 'react-router-dom'

import { useDeleteArticleMutation, useLikeArticleMutation, useUnlikeArticleMutation } from '../redux/ApiSlice'

const useArticleActions = () => {
  const navigate = useNavigate()
  const [deleteArticle] = useDeleteArticleMutation()
  const [likeArticle] = useLikeArticleMutation()
  const [unlikeArticle] = useUnlikeArticleMutation()

  const handleLike = async (slug, refetch) => {
    try {
      await likeArticle(slug).unwrap()
      refetch()
    } catch (e) {
      throw new Error('Failed to like article', e)
    }
  }

  const handleUnlike = async (slug, refetch) => {
    try {
      await unlikeArticle(slug).unwrap()
      refetch()
    } catch (e) {
      throw new Error('Failed to unlike article', e)
    }
  }

  const handleDelete = async (slug) => {
    try {
      await deleteArticle(slug).unwrap()
      navigate('/', { replace: true })
    } catch (e) {
      throw new Error('Failed to delete article', e)
    }
  }

  const handleEditClick = (slug) => {
    navigate(`/articles/${slug}/edit`)
  }

  return { handleLike, handleUnlike, handleDelete, handleEditClick }
}

export default useArticleActions
