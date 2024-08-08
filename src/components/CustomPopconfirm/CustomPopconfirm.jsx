import { Popconfirm } from 'antd'

import useIsMobile from '../../hooks/useIsMobile'

function CustomPopconfirm({ children, handleDelete }) {
  const isMobile = useIsMobile()
  return (
    <Popconfirm
      title="Are you sure to delete this article?"
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
      placement={isMobile ? 'top' : 'rightTop'}
      overlayClassName="custom-popconfirm"
    >
      {children}
    </Popconfirm>
  )
}

export default CustomPopconfirm
