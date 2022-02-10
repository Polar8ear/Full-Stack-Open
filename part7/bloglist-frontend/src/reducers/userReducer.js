const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'CHANGE_USERNAME':
    return { ...state, username: action.data.username }

  case 'CHANGE_PASSWORD':
    return { ...state, password: action.data.password }

  default:
    return state
  }
}

const changeUsername = (username) => ({
  type: 'CHANGE_USERNAME',
  username,
})

const changePassword = (password) => ({
  type: 'CHANGE_PASSWORD',
  password,
})

export { changeUsername, changePassword }

export default userReducer
