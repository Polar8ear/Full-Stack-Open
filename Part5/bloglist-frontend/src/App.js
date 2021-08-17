import React, { useState, useEffect, useRef, useImperativeHandle, } from 'react'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles/App.css'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return(
    <form onSubmit={event => {
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

const Notification = ({ notification }) => {
  if(!notification) return null

  return(
    <div className={`notification ${notification.style}`}>
      {notification.text}
    </div>
  )
}

const Blogs = ({ blogs, ...props }) => {
  return(
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} {...props} />
      )}
    </div>
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
    return{ toggleVisibility }
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

Togglable.propTypes = {
  buttonLabel : PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const newBlogRef = useRef()


  //load blogs upon starting
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        blogs.sort((first,second) => second.likes-first.likes)
        blogs.map( blog => {
          blog.showDetails=false
          return(blog)
        })
        setBlogs(blogs)
      })
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
    }, 3500)
  }

  const handleClickView = (id) => {
    const clickedBlogIndex = blogs.findIndex(blog => blog.id === id)
    var copyBlog = [...blogs]
    copyBlog[clickedBlogIndex].showDetails=!copyBlog[clickedBlogIndex].showDetails

    setBlogs(copyBlog)
  }

  const handleLike = async (id) => {
    const likedBlogIndex = blogs.findIndex(blog => blog.id === id)
    var copyBlog = [...blogs]
    var likedBlog = copyBlog[likedBlogIndex]
    likedBlog.likes+=1

    const updatedBlog = await blogService.update({
      user: likedBlog.user.id,
      likes: likedBlog.likes,
      author: likedBlog.author,
      url: likedBlog.url,
      title: likedBlog.title,
    },likedBlog.id)

    if(updatedBlog){
      setBlogs(copyBlog)
    }

  }

  const handleDelete = async (deletingBlog) => {
    const confirmation = window.confirm(`Remove blog ${deletingBlog.title} by ${deletingBlog.author}`)
    if(!confirmation){
      return
    }

    const status = await blogService.remove(deletingBlog.id)
    if(status === 204){
      const remainingBlogs = [...blogs].filter(blog => blog.id !== deletingBlog.id)
      setBlogs(remainingBlogs)
    }
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

      <Blogs
        blogs={blogs}
        handleClickView={handleClickView}
        handleLike={handleLike}
        handleDelete={handleDelete}
        user={user}
      />
    </div>
  )
}

export default App