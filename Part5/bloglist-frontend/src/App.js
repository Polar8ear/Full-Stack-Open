import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const LoginForm = (props) => {
  return(
    <div>
      <h1>Login to application</h1>
      <form onSubmit={props.handleLogin}>
        <div>
          <label for="Username">Username</label>
          <input 
            type="text" 
            value={props.username}
            name="Username"
            onChange={(event) => props.setUsername(event.target.value)}/>
        </div>
        <div>
          <label for="Password">Password</label>
          <input
            type="password" 
            value={props.password}
            name="Password"
            onChange={(event) => props.setPassword(event.target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const Blogs = ({blogs}) => {
  return(
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = event => {
    event.preventDefault()
    console.log('logging in')
  }

  const props = {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin
  }

  return (
    <div>
      {!user
      ?<LoginForm {...props}/>
      :<Blogs blogs={blogs}/>
      }

      
    </div>
  )
}

export default App