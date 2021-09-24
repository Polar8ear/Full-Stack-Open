
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  const message = notification.message

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: message ? 'block' : 'none'
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return({
    notification: state.notification
  })
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification