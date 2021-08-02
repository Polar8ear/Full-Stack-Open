const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
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