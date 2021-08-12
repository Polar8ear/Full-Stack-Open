import React, { useState, useEffect, useRef, useImperativeHandle, } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles/App.css'

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

const Notification = ({notification}) => {
  if(!notification) return null;

  return(
    <div className={`notification ${notification.style}`}>
      {notification.text}
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

const Togglable = React.forwardRef((props,ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return{toggleVisibility}
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const newBlogRef = useRef()
  

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
      const parsedUser = JSON.parse(userDetails)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  },[])

  const handleLogin = async (event,username,password) => {
    event.preventDefault()

    const credentials = {
      username,
      password
    }
    try {
      const userDetails = await loginService.login(credentials)
      window.localStorage.setItem('user',JSON.stringify(userDetails))
      setUser(userDetails)
      blogService.setToken(userDetails.token)
    } catch (error) {
      showNotification({
        style: 'error',
        text : 'Invalid username or password'
      })
    }
  }
  
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const handleCreateBlog = async (event,newBlog) => {
    event.preventDefault()
    newBlogRef.current.toggleVisibility()
    const savedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(savedBlog))
    showNotification({
      style: 'success',
      text: `a new blog '${savedBlog.title}' by ${savedBlog.author} added `
    })
  }

  const showNotification = newNotification => {
    setNotification(newNotification)
    setTimeout(() => {
      setNotification(null)
    }, 3500);
  }

  if(!user){
    return (
      <div>
        <Notification notification={notification}/>
        <h1>Login to application</h1>
        <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }
  return(
    <div>
      <Notification notification={notification}/>
      <h2>Blogs</h2>
      <div >
        {user.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </div>

      <Togglable buttonLabel='Create New Blog' ref={newBlogRef}>
        <h2>Create new blog</h2>
        <NewBlog handleCreateBlog={handleCreateBlog}/>
      </Togglable>

      <Blogs blogs={blogs}/>
    </div>
  )
}

export default App