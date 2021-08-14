import React from 'react'

const Blog = ({ blog, handleClickView, handleLike }) => {
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
      <button onClick={()=>handleClickView(blog.id)}>{buttonLabel}</button>

      <div style={showWhenVisible}>
        <p>URL:{blog.url}</p>
        <p>Likes: {blog.likes}</p> 
        <button onClick={()=>handleLike(blog.id)}>Like</button>
        <p>Author:{blog.author}</p>
      </div>

    </div>  
  )
}

export default Blog