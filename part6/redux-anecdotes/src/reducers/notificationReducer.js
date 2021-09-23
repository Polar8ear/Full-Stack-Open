const initialState = {}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case('NEW_NOTIFICATION'):
      return {...action.data}

    case('REMOVE_NOTIFICATION'):
      return initialState

    default:
      return state
  }
}

export const createNewNotification = (message) => {
  return({
    type: 'NEW_NOTIFICATION',
    data: { message }
  })
}

export const removeNotification = () => {
  return({
    type: 'REMOVE_NOTIFICATION'
  })
}

export const setNotification = (message, notificationDurationInSeconds=5) => {
  return (dispatch) => {
    dispatch(createNewNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    },notificationDurationInSeconds*1000)
  }
}


export default reducer
