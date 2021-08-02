const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
})

blogsRouter.delete('/', async (request, response) => {
  await Blog.deleteMany({})
  response.status(204).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id)

  if(blog.user.toString() === user._id.toString()){
    await blog.delete()
    return response.status(204).end()
  }
  return response.status(401).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const updatedInfo = { ...request.body }

  await Blog.findByIdAndUpdate(id, updatedInfo, { new:true, runValidators:true },
    (error,document) => {
      document!==null
        ?response.status(200).json(document._doc)
        :response.status(404).json({ error:`Data with id:${id} is not found` })
    })
})

module.exports = blogsRouter