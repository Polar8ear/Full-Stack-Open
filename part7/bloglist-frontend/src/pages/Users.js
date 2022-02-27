import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"

const Users = () => {
  const users = useSelector((state) => state.users)

  if (!users) {
    return null
  }

  return (
    <Container className="w-50 mx-auto">
      <h2>Users</h2>
      <hr />
      <Table striped bordered hover className="">
        <thead>
          <tr>
            <th>Username</th>
            <th>Number of blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`./${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}

export default Users
