const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

const MONGODB_URI = config.MONGODB_URI

const blogSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  author: String,
  url: {
    type:String,
    required:true
  },
  likes: {
    type:Number,
    default:0
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })  .then(() => logger.info(`Connected to ${MONGODB_URI}`))
  .catch(error => {
    logger.error(`error connecting to ${MONGODB_URI}`)
    logger.error(error)
  })

module.exports = mongoose.model('Blog', blogSchema)