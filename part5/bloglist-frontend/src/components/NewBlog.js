import React, { useState } from 'react'

const NewBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  return (
    <form onSubmit={(event) => {
      handleCreateBlog(event, { title, author, url })
      setTitle('')
      setAuthor('')
      setURL('')
    }}
    >
      <div>
        <label>Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div>
        <label>Author:</label>
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>

      <div>
        <label>URL:</label>
        <input
          id="url"
          type="text"
          value={url}
          name="URL"
          onChange={(event) => setURL(event.target.value)}
        />
      </div>

      <button id="createBtn" type="submit">Create</button>
    </form>
  )
}

export default NewBlog
