import { Pagination, ConfigProvider } from 'antd'

function CustomPagination({ currentPage, totalCount, pageSize, onPageChange, className }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemBg: 'rgba(235, 238, 243, 1)',
            itemActiveBg: 'rgb(24, 144, 255)',
          },
        },
      }}
    >
      <Pagination
        current={currentPage}
        total={totalCount}
        pageSize={pageSize}
        onChange={onPageChange}
        showSizeChanger={false}
        className={className}
      />
    </ConfigProvider>
  )
}

export default CustomPagination
