import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initialiseUsers } from "../reducers/usersReducer"

const Users = () => {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseUsers())
  }, [])

  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th> </th>
          <th>Blogs created</th>
        </tr>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Users
