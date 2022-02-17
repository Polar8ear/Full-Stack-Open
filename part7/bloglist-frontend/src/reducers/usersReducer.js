import usersService from "../services/users"

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USERS":
      return action.data.users

    default:
      return state
  }
}

const setUsers = (users) => ({
  type: "SET_USERS",
  data: {
    users,
  },
})

const initialiseUsers = () => async (dispatch) => {
  const users = await usersService.getAllUsers()
  dispatch(setUsers(users))
}

export { initialiseUsers }

export default usersReducer
