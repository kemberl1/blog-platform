import { useParams } from 'react-router-dom'

import { useGetArticleQuery } from '../redux/ApiSlice'
import Article from '../components/Article/Article'
import ErrorIndicator from '../components/Error/ErrorIndicator/ErrorIndicator'
import Loader from '../Loader/Loader'

function SingleArticlePage() {
  const { slug } = useParams()
  const { data, isLoading, error } = useGetArticleQuery(slug)

  if (isLoading) return <Loader />
  if (error) return <ErrorIndicator message={error.message} />

  const article = data?.article

  return article ? <Article article={article} showBody /> : null
}

export default SingleArticlePage
