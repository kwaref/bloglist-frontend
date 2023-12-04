import PropTypes from 'prop-types'

export const Notification = ({ message, error=false }) => {
  if (message === null) {
    return null
  }
  return (<div className={error ? 'error' : 'success' }>{message}</div>)
}

Notification.protoTypes = {
  message: PropTypes.string.isRequired
}