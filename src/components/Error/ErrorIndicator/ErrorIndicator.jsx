import { Alert } from 'antd'
import { PropTypes } from 'prop-types'

export default function ErrorIndicator({ message = 'Error', description = 'Something went wrong. Try later.' }) {
  return (
    <div className="error-indicator">
      <Alert message={message} description={description} type="error" showIcon />
    </div>
  )
}
ErrorIndicator.propTypes = {
  message: PropTypes.string.isRequired,
}
