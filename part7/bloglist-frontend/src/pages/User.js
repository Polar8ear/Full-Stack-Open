import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {
  const params = useParams()
  const users = useSelector((state) => state.users)

  const id = params.userId
  const selectedUser = users.find((user) => user.id === id)

  if (!selectedUser) {
    return null
  }

  return (
    <div>
      <h2>{selectedUser.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {selectedUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
