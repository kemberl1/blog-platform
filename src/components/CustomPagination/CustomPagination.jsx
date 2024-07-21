import { Pagination } from 'antd'

function CustomPagination({ currentPage, totalCount, pageSize, onPageChange, className }) {
  return (
    <Pagination
      current={currentPage}
      total={totalCount}
      pageSize={pageSize}
      onChange={onPageChange}
      showSizeChanger={false}
      className={className}
    />
  )
}

export default CustomPagination
