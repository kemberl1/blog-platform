import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ArticlesList from '../components/ArticlesList/ArticlesList'
import { useGetPostsQuery } from '../redux/ApiSlice'
import CustomPagination from '../components/CustomPagination/CustomPagination'

function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageFromUrl = parseInt(searchParams.get('page'), 10) || 1
  const [page, setPage] = useState(pageFromUrl)
  const { data, isLoading, error } = useGetPostsQuery({ page })

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  useEffect(() => {
    setSearchParams({ page })
    window.scrollTo(0, 0)
  }, [page, setSearchParams])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

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
