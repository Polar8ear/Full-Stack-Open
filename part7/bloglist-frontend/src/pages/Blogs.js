import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setBlogs,
  likeBlog,
  addBlog,
  deleteBlog,
} from "../reducers/blogsReducer"
import { showNotification } from "../reducers/notificationReducer"
import Togglable from "../components/Togglable"
import Blog from "../components/Blog"
import NewBlog from "../components/NewBlog"

const Blogs = () => {
  const dispatch = useDispatch
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const newBlogRef = useRef()

  const handleCreateBlog = (event, newBlog) => {
    event.preventDefault()
    newBlogRef.current.toggleVisibility()

    dispatch(addBlog(newBlog)).then((savedBlog) =>
      dispatch(
        showNotification({
          style: "success",
          text: `a new blog '${savedBlog.title}' by ${savedBlog.author} added `,
        })
      )
    )
  }

  const handleClickView = (id) => {
    const clickedBlogIndex = blogs.findIndex((blog) => blog.id === id)
    const copyBlog = [...blogs]
    copyBlog[clickedBlogIndex].showDetails =
      !copyBlog[clickedBlogIndex].showDetails

    dispatch(setBlogs(copyBlog))
  }

  const handleLike = (id) => {
    dispatch(likeBlog(id))
  }

  const handleDelete = (deletingBlog) => {
    const confirmation = window.confirm(
      `Remove blog ${deletingBlog.title} by ${deletingBlog.author}`
    )
    if (!confirmation) {
      return
    }

    dispatch(deleteBlog(deletingBlog.id))
  }

  return (
    <div>
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

export default Blogs
