import { Alert } from 'antd'
import { PropTypes } from 'prop-types'


export default function ErrorIndicator({ message = 'Something went wrong. Try later.' }) {
  return (
    <div className="error-indicator">
      <Alert message="Error" description={message} type="error" showIcon />
    </div>
  )
}
ErrorIndicator.propTypes = {
  message: PropTypes.string.isRequired,
}
