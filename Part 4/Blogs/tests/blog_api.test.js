const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')


const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialNotes
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('When some blogs is saved in DB initially',() => {
  test('correct number of blogs is returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('blogs have defined id property', async () => {
    const blogsAtLast = await helper.blogsInDB()
    expect(blogsAtLast.map(blog => blog.id)).toBeDefined()
  })
})


afterAll(() => {
  mongoose.connection.close()
})