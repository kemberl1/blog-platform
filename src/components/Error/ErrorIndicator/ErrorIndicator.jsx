import { Alert } from 'antd'
import { PropTypes } from 'prop-types'


export default function ErrorIndicator({ message = 'An error occurred' }) {
  return (
    <div className="error-indicator">
      <Alert message="Error" description={message} type="error" showIcon />
    </div>
  )
}
ErrorIndicator.propTypes = {
  message: PropTypes.string.isRequired,
}
