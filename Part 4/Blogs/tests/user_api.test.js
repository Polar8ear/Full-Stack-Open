const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('../utils/test_helper')


const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('User API testing', () => {
  describe('User is not created and status code and error message is suitable', () => {
    test('when username is <3 characters', async () => {
      const newUser = {
        username:'no',
        password:'12345678',
        name:'Mr. No'
      }

      await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect(/`username` [a-zA-z0-9()]* is shorter than the minimum allowed length/)


      const userAtEnd = await helper.usersInDB()
      expect(userAtEnd).toHaveLength(helper.initialUsers.length)
    })

    test('when password is <3 characters', async () => {
      const newUser = {
        username:'Yes',
        password:'No',
        name:'Mr. Yes'
      }

      await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect(/`password` is shorter than the minimum allowed length/)


      const userAtEnd = await helper.usersInDB()
      expect(userAtEnd).toHaveLength(helper.initialUsers.length)
    })
  })
})


afterAll(() => {
  mongoose.connection.close()
})