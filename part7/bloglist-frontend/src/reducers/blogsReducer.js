import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_BLOGS':
  case 'INTIALISE_BLOGS':
    return action.data.blogs

  case 'ADD_BLOG':
    return state.concat(action.data.blog)

  default:
    return state
  }
}

const initialiseBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch({
    type: 'INTIALISE_BLOGS',
    data: { blogs },
  })
}

const setBlogs = (blogs) => ({
  type: 'SET_BLOGS',
  data: { blogs },
})

const addBlog = (blog) => ({
  type: 'ADD_BLOG',
  data: { blog },
})

export { initialiseBlogs, addBlog, setBlogs }

export default blogsReducer
