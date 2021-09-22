
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
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

export default Notification