import blogService from "../services/blogs"

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.data.blogs

    case '"ADD_BLOG"':
      return state.concat(action.data.blog)

    default:
      return state
  }
}

const initialiseBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch({
    type: "SET_BLOGS",
    data: { blogs },
  })
}

const setBlogs = (blogs) => ({
  type: "SET_BLOGS",
  data: { blogs },
})

const addBlog = (blog) => async (dispatch) => {
  const savedBlog = await blogService.create(blog)
  dispatch({
    type: "ADD_BLOG",
    data: { blog: savedBlog },
  })
  return savedBlog
}

const likeBlog = (id) => async (dispatch, getState) => {
  let likedBlog
  const updatedBlogs = getState().blogs.map((blog) => {
    if (blog.id === id) {
      likedBlog = blog
      likedBlog.likes += 1
    }
    return blog
  })

  const updatedBlog = await blogService.update(
    {
      user: likedBlog.user.id,
      likes: likedBlog.likes,
      author: likedBlog.author,
      url: likedBlog.url,
      title: likedBlog.title,
    },
    likedBlog.id
  )

  if (updatedBlog) {
    dispatch(setBlogs(updatedBlogs))
  }
}

const deleteBlog = (id) => async (dispatch, getState) => {
  const updatedBlogs = getState().blogs.filter((blog) => blog.id !== id)
  const deleteResponseStatus = await blogService.remove(id)

  if (deleteResponseStatus === 204) {
    dispatch(setBlogs(updatedBlogs))
  }
}

export { initialiseBlogs, addBlog, setBlogs, likeBlog, deleteBlog }

export default blogsReducer
