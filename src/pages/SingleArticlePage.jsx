import { Navigate, useParams } from 'react-router-dom'

import { useGetArticleQuery } from '../redux/ApiSlice'
import Article from '../components/Article/Article'
import ErrorIndicator from '../components/Error/ErrorIndicator/ErrorIndicator'
import Loader from '../components/Loader/Loader'
import useArticleActions from '../hooks/useArticleActions'

function SingleArticlePage() {
  const { slug } = useParams()
  const { data, isLoading, error, refetch } = useGetArticleQuery(slug)
  const { handleLike, handleUnlike, handleDelete, handleEditClick } = useArticleActions()
  const article = data?.article

  if (isLoading) return <Loader />
  if (error) {
    if (error.originalStatus === 404) {
      return <Navigate to="*" />
    }
    return <ErrorIndicator message={error.data} description={error.data?.message || error.error} />
  }

  return article ? (
    <Article
      article={article}
      showBody
      handleEditClick={() => handleEditClick(slug)}
      handleDelete={() => handleDelete(slug)}
      handleLike={() => handleLike(slug, refetch)}
      handleUnlike={() => handleUnlike(slug, refetch)}
    />
  ) : null
}

export default SingleArticlePage
