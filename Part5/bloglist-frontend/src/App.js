import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = (props) => {
  return(
    <div>
      <h1>Login to application</h1>
      <form onSubmit={props.handleLogin}>
        <div>
          <label>Username</label>
          <input 
            type="text" 
            value={props.username}
            name="Username"
            onChange={(event) => props.setUsername(event.target.value)}/>
        </div>
        <div>
          <label>Password</label>
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

const Blogs = (props) => {
  const { blogs }  = props
  return(
    <div>
      {props.children}
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

  useEffect(() => {
    const userDetails = window.localStorage.getItem('user')

    if(userDetails){
    setUser(JSON.parse(userDetails))
    }
  },[])

  const handleLogin = async event => {
    event.preventDefault()
    const credentials = {
      username,
      password
    }
    const userDetails = await loginService.login(credentials)
    window.localStorage.setItem('user',JSON.stringify(userDetails))
    setUser(userDetails)
    setUsername('')
    setPassword('')
  }
  
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const props = {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
  }
  if(!user){
    return (
      <div>
        <LoginForm {...props}/>
      </div>
    )
  }
  return(
    <div>
      <h2>Blogs</h2>
      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <Blogs blogs={blogs}/>
    </div>
  )
}

export default App