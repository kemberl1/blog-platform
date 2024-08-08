import { forwardRef } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CustomButton = forwardRef(
  ({ children, to, className = '', onClick = () => {}, danger = false, type = '' }, ref) => {
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
  }
)

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  danger: PropTypes.bool,
  type: PropTypes.string,
  ref: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
}

export default CustomButton
