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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  //load blogs upon starting
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //check if there is user data stored in local storage
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

  const handleCreateBlog = async (event,newBlog) => {
    event.preventDefault()
    const savedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(savedBlog))
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
      <NewBlog handleCreateBlog={handleCreateBlog}/>
      <Blogs blogs={blogs}/>
    </div>
  )
}

export default App