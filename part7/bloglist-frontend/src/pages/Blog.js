import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
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
  }

  if (!selectedBlog) {
    return null
  }

  return (
    <div>
      <h2>{selectedBlog.name}</h2>
      <h2>{selectedBlog.author}</h2>
      <a href={`//${selectedBlog.url}`}>{selectedBlog.url}</a>
      <div>
        {selectedBlog.likes} likes
        <button type="button" onClick={() => handleLikeBlog(selectedBlog.id)}>
          Like
        </button>
      </div>
      <p>Added by {selectedBlog.user.name}</p>

      <h3>Comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          onChange={(event) => setNewComment(event.target.value)}
          value={newComment}
        />
        <button type="submit" action>
          Add comment
        </button>
      </form>
      <ul>
        {selectedBlog.comments.map((blogComment) => (
          <li>{blogComment}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
