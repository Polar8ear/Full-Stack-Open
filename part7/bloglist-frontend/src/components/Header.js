import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"

import { logoutUser } from "../reducers/userReducer"

const Header = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Navbar bg="light" className="px-4 gap-2">
      <Navbar.Brand>Blog List App</Navbar.Brand>
      <Nav.Link as={Link} to="/">
        Blogs
      </Nav.Link>
      <Nav.Link as={Link} to="/users">
        Users
      </Nav.Link>
      <Nav.Item className="ms-auto">{user.name} is logged in</Nav.Item>
      <Nav.Item>
        <Button
          type="button"
          variant="primary"
          onClick={handleLogout}
          className="mr-1"
        >
          Logout
        </Button>
      </Nav.Item>
    </Navbar>
  )
}

export default Header
