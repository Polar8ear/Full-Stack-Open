import React from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"

const User = () => {
  const params = useParams()
  const users = useSelector((state) => state.users)

  const id = params.userId
  const selectedUser = users.find((user) => user.id === id)

  if (!selectedUser) {
    return null
  }

  return (
    <Container className="w-50 mx-auto">
      <h2>{selectedUser.name}</h2>
      <hr />
      <h3>Added blogs</h3>
      <ListGroup>
        {selectedUser.blogs.map((blog) => (
          <ListGroup.Item as={Link} to={`/blogs/${blog.id}`} key={blog.id}>
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default User
