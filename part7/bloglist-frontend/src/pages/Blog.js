import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { likeBlog } from "../reducers/blogsReducer"

const User = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const blogs = useSelector((state) => state.blogs)

  const id = params.blogId
  const selectedBlog = blogs.find((user) => user.id === id)

  const handleLikeBlog = () => {
    dispatch(likeBlog(id))
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
      <ul>
        {selectedBlog.comments.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
