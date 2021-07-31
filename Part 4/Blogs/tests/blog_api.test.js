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
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd.map(blog => blog.id)).toBeDefined()
  })

  test('blog can be posted successfully', async () => {
    const newBlog = {
      title: 'new blog for testing',
      author: 'test author',
      url: 'https://test.com/',
      likes: 1000,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialNotes.length+1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(newBlog.title)
  })

  test('like property is defaulted to 0 if absence', async () => {
    const newBlog = {
      title: 'new blog for testing',
      author: 'test author',
      url: 'https://test.com/'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()

    const blogAdded = blogsAtEnd.find(blog => blog.title===newBlog.title)
    expect(blogAdded.likes).toBe(0)
  })
})


afterAll(() => {
  mongoose.connection.close()
})