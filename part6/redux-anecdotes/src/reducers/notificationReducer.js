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

export const createNewNotification = (message, timeoutID) => {
  return({
    type: 'NEW_NOTIFICATION',
    data: { message, timeoutID }
  })
}

export const removeNotification = () => {
  return({
    type: 'REMOVE_NOTIFICATION'
  })
}

export const setNotification = (message, durationInSeconds=5) => {
  return (dispatch, getState) => {
    //Cancel running timeout to avoid previous notification causing the new notification to be removed
    const existingTimeoutID= getState().notification.timeoutID
    if(existingTimeoutID) {
      clearTimeout(existingTimeoutID)
    }

    //Schedule remove notification first to have an id for saving in store
    const timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    },durationInSeconds*1000)

    dispatch(createNewNotification(message,timeoutID))
  }
}


export default reducer
