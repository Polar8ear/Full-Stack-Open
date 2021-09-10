const testRouter = require('express').Router()
const Blog = require('../models/blog')

testRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})

  response.status(200).end()
} )

module.exports = testRouter