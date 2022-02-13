const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INTIALISE_BLOGS':
    return action.data.blogs

  case 'ADD_BLOG':
    return state.concat(action.data.blog)

  default:
    return state
  }
}

const initialiseBlogs = (blogs) => ({
  type: 'INTIALISE_BLOGS',
  data: { blogs },
})

const addBlog = (blog) => ({
  type: 'ADD_BLOG',
  data: { blog },
})

export { initialiseBlogs, addBlog }

export default blogsReducer
