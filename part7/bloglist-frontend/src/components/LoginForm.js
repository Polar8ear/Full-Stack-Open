import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeUsername, changePassword } from '../reducers/userReducer'

const LoginForm = ({ handleLogin }) => {
  const dispatch = useDispatch()

  const username = useSelector((state) => state.user.username)
  const password = useSelector((state) => state.user.password)

  return (
    <form onSubmit={(event) => {
      handleLogin(event, username, password)
      dispatch(changeUsername(''))
      dispatch(changePassword(''))
    }}
    >
      <div>
        <label htmlFor="username">
          Username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={(event) => dispatch(changeUsername(event.target.value))}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={(event) => dispatch(changePassword(event.target.value))}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
