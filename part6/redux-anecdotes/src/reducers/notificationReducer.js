const initialState = {
  message: 'OLAAAAA',
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case('NEW_NOTIFICATION'):
      return {...action.data}

    default:
      return state
  }
}

export default reducer
