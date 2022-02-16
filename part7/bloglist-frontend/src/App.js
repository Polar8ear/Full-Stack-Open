import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addNotification,
  deleteNotification,
} from "./reducers/notificationReducer"
import {
  addBlog,
  deleteBlog,
  initialiseBlogs,
  likeBlog,
  setBlogs,
} from "./reducers/blogsReducer"
import {
  initialiseUserInLocalStorage,
  loginUser,
  logoutUser,
} from "./reducers/userReducer"

import Blog from "./components/Blog"
import NewBlog from "./components/NewBlog"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"

import "./styles/App.css"

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)
  const newBlogRef = useRef()

  // load blogs and user if in local storage upon starting
  useEffect(() => {
    dispatch(initialiseBlogs())
    dispatch(initialiseUserInLocalStorage)
  }, [])

  useEffect(() => {
    const sortedBlogs = blogs
      .concat()
      .sort((first, second) => second.likes - first.likes)

    if (JSON.stringify(blogs) !== JSON.stringify(sortedBlogs)) {
      dispatch(setBlogs(sortedBlogs))
    }
  }, [blogs])

  const showNotification = (notificationData) => {
    dispatch(addNotification(notificationData))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, 3500)
  }

  const handleLogin = async (event, username, password) => {
    event.preventDefault()

    const credentials = {
      username,
      password,
    }
    dispatch(loginUser(credentials)).catch(() => {
      showNotification({
        style: "error",
        text: "Invalid username or password",
      })
    })
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleCreateBlog = (event, newBlog) => {
    event.preventDefault()
    newBlogRef.current.toggleVisibility()

    dispatch(addBlog(newBlog)).then((savedBlog) =>
      showNotification({
        style: "success",
        text: `a new blog '${savedBlog.title}' by ${savedBlog.author} added `,
      })
    )
  }

  const handleClickView = (id) => {
    const clickedBlogIndex = blogs.findIndex((blog) => blog.id === id)
    const copyBlog = [...blogs]
    copyBlog[clickedBlogIndex].showDetails =
      !copyBlog[clickedBlogIndex].showDetails

    dispatch(setBlogs(copyBlog))
  }

  const handleLike = async (id) => {
    dispatch(likeBlog(id))
  }

  const handleDelete = async (deletingBlog) => {
    const confirmation = window.confirm(
      `Remove blog ${deletingBlog.title} by ${deletingBlog.author}`
    )
    if (!confirmation) {
      return
    }

    dispatch(deleteBlog(deletingBlog.id))
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
      <h2>Blogs</h2>
      <div>
        {user.name} is logged in
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <Togglable buttonLabel="Create New Blog" ref={newBlogRef}>
        <h2>Create new blog</h2>
        <NewBlog handleCreateBlog={handleCreateBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleClickView={handleClickView}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
