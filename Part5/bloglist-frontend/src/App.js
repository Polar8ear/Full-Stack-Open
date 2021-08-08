import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({handleLogin}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return(
    <form onSubmit={event=>{
      handleLogin(event,username,password)
      setUsername('')
      setPassword('')  
      }
    }>
      <div>
        <label>Username</label>
        <input 
          type="text" 
          value={username}
          name="Username"
          onChange={(event) => setUsername(event.target.value)}/>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password" 
          value={password}
          name="Password"
          onChange={(event) => setPassword(event.target.value)}/>
      </div>
      <button type="submit">login</button>
    </form>
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

  const handleLogin = async (event,username,password) => {
    event.preventDefault()
    const credentials = {
      username,
      password
    }
    const userDetails = await loginService.login(credentials)
    window.localStorage.setItem('user',JSON.stringify(userDetails))
    setUser(userDetails)
  }
  
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  if(!user){
    return (
      <div>
        <h1>Login to application</h1>
        <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }
  return(
    <div>
      <h2>Blogs</h2>
      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>Logout</button>

      <h2>Create new blog</h2>
      <NewBlog></NewBlog>
      <Blogs blogs={blogs}/>
    </div>
  )
}

export default App