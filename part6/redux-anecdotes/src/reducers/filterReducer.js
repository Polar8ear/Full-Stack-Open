const initialState = {
  searchedText: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

  case ('NEW_FILTER'):
    return { ...action.data }

  default:
    return state
  }
}

export const newFilter = (searchedText) => ({
  type: 'NEW_FILTER',
  data: { searchedText },
})


export default reducer
