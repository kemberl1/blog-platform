import { useParams } from 'react-router-dom'

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
  if (error) return <ErrorIndicator message={error.message} />

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
