const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
require('express-async-errors')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
// const usersRouter = require('./controllers/users')
const cors = require('cors')

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => logger.info(`Connected to ${config.MONGODB_URI}`))
  .catch(error => {
    logger.error(`error connecting to ${config.MONGODB_URI}`)
    logger.error(error)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs',blogsRouter)
// app.use('/api/users',usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app