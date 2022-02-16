import blogService from "../services/blogs"
import loginService from "../services/login"

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data.user

    default:
      return state
  }
}

const setUser = (user) => ({
  type: "SET_USER",
  data: {
    user,
  },
})

const deleteUser = () => ({
  type: "SET_USER",
  data: {
    user: null,
  },
})

const initialiseUserInLocalStorage = () => (dispatch) => {
  const userDetails = window.localStorage.getItem("user")

  if (userDetails) {
    const parsedUser = JSON.parse(userDetails)
    dispatch(setUser(parsedUser))
    blogService.setToken(parsedUser.token)
  }
}

const loginUser = (credentials) => async (dispatch) => {
  const userDetails = await loginService
    .login(credentials)
    .catch((error) => Promise.reject(error))

  dispatch(setUser(userDetails))
  window.localStorage.setItem("user", JSON.stringify(userDetails))
  blogService.setToken(userDetails.token)
}

const logoutUser = () => (dispatch) => {
  dispatch(setUser(null))
  window.localStorage.removeItem("user")
  blogService.removeToken()
}

export {
  setUser,
  deleteUser,
  initialiseUserInLocalStorage,
  loginUser,
  logoutUser,
}

export default userReducer
