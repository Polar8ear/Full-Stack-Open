import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { addComment, likeBlog } from "../reducers/blogsReducer"

const User = () => {
  const [newComment, setNewComment] = useState("")

  const dispatch = useDispatch()
  const params = useParams()
  const blogs = useSelector((state) => state.blogs)

  const id = params.blogId
  const selectedBlog = blogs.find((user) => user.id === id)

  const handleLikeBlog = () => {
    dispatch(likeBlog(id))
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(addComment(id, newComment))
    setNewComment("")
  }

  if (!selectedBlog) {
    return null
  }

  return (
    <Container className="w-50 mx-auto">
      <h2>{selectedBlog.title}</h2>
      <h5>{selectedBlog.author}</h5>
      <hr />
      <a href={`//${selectedBlog.url}`}>{selectedBlog.url}</a>
      <div>
        {selectedBlog.likes} likes
        <Button
          type="button"
          onClick={() => handleLikeBlog(selectedBlog.id)}
          className="ms-2"
        >
          Like
        </Button>
      </div>
      <p>Added by {selectedBlog.user.name}</p>

      <h3>Comments</h3>
      <Form onSubmit={handleAddComment}>
        <Form.Control
          onChange={(event) => setNewComment(event.target.value)}
          value={newComment}
          className="my-3"
        />
        <Button type="submit" className="my-3">
          Add comment
        </Button>
      </Form>
      <ul>
        {selectedBlog.comments.map((blogComment) => (
          <li>{blogComment}</li>
        ))}
      </ul>
    </Container>
  )
}

export default User
