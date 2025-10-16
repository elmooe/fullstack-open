const Alert = ({ message, type }) => {
  if (!message) {
    return null
  }

  const alertClass = type === 'error' ? 'failed' : 'success'

  return (
    <div className={`alert-${alertClass}`}>
      {message}
    </div>
  )
}

export default Alert