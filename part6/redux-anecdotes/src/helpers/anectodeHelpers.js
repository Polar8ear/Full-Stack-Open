import { createNewNotification, removeNotification } from "../reducers/notificationReducer"

export const popNotification = (message,dispatch) => {
  const durationInms = 5000
  dispatch(createNewNotification(message))
  setTimeout(()=>{
    dispatch(removeNotification())
  }, durationInms)
}