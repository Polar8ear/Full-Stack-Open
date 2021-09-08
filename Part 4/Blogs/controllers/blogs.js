const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  const populatedBlog = await savedBlog.populate('user').execPopulate()
  response.status(201).json(populatedBlog)

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(id)
  if(!blog) {
    return response.status(404).json({ error: `No blog with id ${id} found` })
  }

  if(blog.user.toString() === user.id.toString()){
    await blog.delete()
    return response.status(204).end()
  }
  return response.status(401).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const updatedInfo = { ...request.body }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedInfo, { new:true, runValidators:true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter