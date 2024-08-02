import { forwardRef } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CustomButton = forwardRef(({ children, to, ...props }, ref) => {
  const { className = '', onClick = () => {}, danger, type = '' } = props

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick} ref={ref}>
        {children}
      </Link>
    )
  }

  return (
    <Button className={className} type={type} onClick={onClick} danger={danger} ref={ref}>
      {children}
    </Button>
  )
})

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
}

export default CustomButton
