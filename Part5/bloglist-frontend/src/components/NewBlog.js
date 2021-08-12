import React, { useState } from 'react'

const NewBlog = ({handleCreateBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  return(
    <form onSubmit={event=>{
      handleCreateBlog(event,{title,author,url})
      setTitle('')
      setAuthor('')
      setURL('')
    }}>
      <div>
        <label>Title:</label>
        <input 
         type="text" 
         value={title}
         name="Title"
         onChange={(event) => setTitle(event.target.value)}/>
      </div>

      <div>
        <label>Author:</label>
        <input
         type="text" 
         value={author}
         name="Author"
         onChange={(event) => setAuthor(event.target.value)}/>
      </div>

      <div>
        <label>URL:</label>
        <input
         type="text" 
         value={url}
         name="URL"
         onChange={(event) => setURL(event.target.value)}/>
      </div>

      <button type="submit">Create</button>
    </form>
  )
}

export default NewBlog