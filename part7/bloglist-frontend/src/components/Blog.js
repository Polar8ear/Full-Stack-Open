import React, { useState } from 'react'

const Blog = ({
  blog, handleLike, handleDelete, user,
}) => {
  const [showDetails, setShowDetails] = useState(false)
  const buttonLabel = showDetails ? 'close' : 'view'
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const toggleShowDetails = () => setShowDetails(!showDetails)

  const showWhenUserMatch = { display: blog.user.username === user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      {' '}
      {blog.author}
      <button type="button" className="viewBtn" onClick={toggleShowDetails}>{buttonLabel}</button>

      <div className="blogDetails" style={showWhenVisible}>
        <p>
          URL:
          {blog.url}
        </p>

        <p className="likes">
          Likes:
          {blog.likes}
        </p>
        <button type="button" className="likeBtn" onClick={() => handleLike(blog.id)}>Like</button>

        <p>
          Author:
          {blog.author}
        </p>

        <button type="button" style={showWhenUserMatch} onClick={() => handleDelete(blog)}>Remove</button>
      </div>

    </div>
  )
}

export default Blog
