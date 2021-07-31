const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

const MONGODB_URI = config.MONGODB_URI

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })  .then(() => logger.info(`Connected to ${MONGODB_URI}`))
  .catch(error => {
    logger.error(`error connecting to ${MONGODB_URI}`)
    logger.error(error)
  })

module.exports = mongoose.model('Blog', blogSchema)