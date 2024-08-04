import { Pagination } from 'antd'
import './CustomPagination.module.scss'

function CustomPagination({ currentPage, totalCount, pageSize, onPageChange, className }) {
  return (
    <Pagination
      current={currentPage}
      total={totalCount}
      pageSize={pageSize}
      onChange={onPageChange}
      showSizeChanger={false}
      className={`${className} custom-pagination`}
    />
  )
}

export default CustomPagination
