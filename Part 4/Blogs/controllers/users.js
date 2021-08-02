const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

userRouter.get('/', async (request,response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

userRouter.post('/', async (request,response) => {
  const body = request.body

  if(body.password.length<=3){
    return response.status(400).json({ error:'Password entered must be more than or equal to 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter