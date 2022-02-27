import React from "react"

import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const showWhenUserMatch = {
    display: blog.user.username === user.username ? "" : "none",
  }

  return (
    <Accordion.Item eventKey={blog.id}>
      <Accordion.Header>
        <span>
          {blog.title} <i>by</i> {blog.author}
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <p>
          URL:
          {blog.url}
        </p>

        <p className="likes">
          Likes:
          {blog.likes}
        </p>
        <Button
          type="button"
          variant="primary"
          className="likeBtn me-3"
          onClick={() => handleLike(blog.id)}
        >
          Like
        </Button>
        <Button variant="primary" as={Link} to={`/blogs/${blog.id}`}>
          Details
        </Button>
        <p>
          Author:
          {blog.author}
        </p>

        <Button
          type="button"
          variant="danger"
          style={showWhenUserMatch}
          onClick={() => handleDelete(blog)}
        >
          Remove
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default Blog
