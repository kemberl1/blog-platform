import { scroller } from 'react-scroll'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import ArticlesList from '../components/ArticlesList/ArticlesList'
import { useGetPostsQuery } from '../redux/ApiSlice'
import CustomPagination from '../components/CustomPagination/CustomPagination'
import ErrorIndicator from '../components/Error/ErrorIndicator/ErrorIndicator'
import Loader from '../Loader/Loader'

function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page'), 10) || 1
  const { data, isLoading, error, refetch } = useGetPostsQuery({ page })

  useEffect(() => {
    refetch()
  }, [searchParams, refetch])

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage })
    scroller.scrollTo('main-content', { smooth: true, offset: -80 })
  }

  if (isLoading) return <Loader />
  if (error) return <ErrorIndicator message={error.message} />

  return (
    <>
      <ArticlesList articles={data?.articles || []} />
      <CustomPagination
        currentPage={page}
        totalCount={data?.articlesCount || 0}
        pageSize={10}
        onPageChange={handlePageChange}
        className="pagination"
      />
    </>
  )
}

export default ArticlesPage
