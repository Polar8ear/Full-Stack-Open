import React from "react"
import { useDispatch, useSelector } from "react-redux"

import Container from "react-bootstrap/Container"
import Accordion from "react-bootstrap/Accordion"
import Row from "react-bootstrap/Row"

import { setBlogs, likeBlog, deleteBlog } from "../reducers/blogsReducer"
import Blog from "../components/Blog"
import NewBlog from "../components/NewBlog"

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

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
    <Container>
      <Row className="w-50 mx-auto">
        <NewBlog />
      </Row>

      <Row className="w-50 mx-auto">
        <Accordion>
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
        </Accordion>
      </Row>
    </Container>
  )
}

export default Blogs
