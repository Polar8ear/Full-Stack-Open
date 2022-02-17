const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data

    case "DELETE_NOTIFICATION":
      return null

    default:
      return state
  }
}

const addNotification = (notification) => ({
  type: "NEW_NOTIFICATION",
  data: notification,
})

const deleteNotification = () => ({
  type: "DELETE_NOTIFICATION",
})

const showNotification = (notification) => (dispatch) => {
  dispatch(addNotification(notification))
  setTimeout(() => {
    dispatch(deleteNotification())
  }, 3000)
}

export { addNotification, deleteNotification, showNotification }

export default notificationReducer
