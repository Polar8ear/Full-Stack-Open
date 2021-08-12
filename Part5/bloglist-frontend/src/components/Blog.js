import React from 'react'

const Blog = ({ blog, handleClickView }) => {
  const buttonLabel = blog.showDetails ? 'close' : 'view'
  const showWhenVisible = {display : blog.showDetails ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={(event)=>handleClickView(event, blog.id)}>{buttonLabel}</button>

      <div style={showWhenVisible}>
        <p>URL:{blog.url}</p>
        <p>Likes: {blog.likes}</p>
        <p>Author:{blog.author}</p>
      </div>

    </div>  
  )
}

export default Blog