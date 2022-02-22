import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import { showNotification } from "./reducers/notificationReducer"
import { initialiseBlogs, setBlogs } from "./reducers/blogsReducer"
import { initialiseUserInLocalStorage, loginUser } from "./reducers/userReducer"

import Notification from "./components/Notification"
import Header from "./components/Header"
import LoginForm from "./components/LoginForm"

import Blog from "./pages/Blog"
import Blogs from "./pages/Blogs"
import Users from "./pages/Users"
import User from "./pages/User"

import "./styles/App.css"
import { initialiseUsers } from "./reducers/usersReducer"

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    dispatch(initialiseUserInLocalStorage())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(initialiseBlogs())
      dispatch(initialiseUsers())
    }
  }, [dispatch, user])

  useEffect(() => {
    const sortedBlogs = blogs
      .concat()
      .sort((first, second) => second.likes - first.likes)

    if (JSON.stringify(blogs) !== JSON.stringify(sortedBlogs)) {
      dispatch(setBlogs(sortedBlogs))
    }
  }, [blogs])

  const handleLogin = async (event, username, password) => {
    event.preventDefault()

    const credentials = {
      username,
      password,
    }
    dispatch(loginUser(credentials)).catch(() => {
      dispatch(
        showNotification({
          style: "error",
          text: "Invalid username or password",
        })
      )
    })
  }

  if (!user) {
    return (
      <div>
        <Notification notification={notification} />
        <h1>Login to application</h1>
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }
  return (
    <div>
      <Notification notification={notification} />
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:blogId" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
