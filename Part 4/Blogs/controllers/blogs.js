const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({})
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

  user.notes = user.notes.concat(savedBlog._id)
  await user.save()
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
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