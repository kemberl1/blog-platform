import { Button } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function CustomButton({ children = {}, to = null, ...props }) {
  const { className = '', onClick = () => {}, danger, type = '' } = props

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <Button className={className} type={type} onClick={onClick} danger={danger}>
      {children}
    </Button>
  )
}

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
}

export default CustomButton
