const mongoose = require('mongoose')
const config = require('../utils/config')

const MONGODB_URI = config.MONGODB_URI 

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(()=>console.log(`Connected to ${MONGODB_URI}`))
  .catch(error=>{
    console.log(`error connecting to ${MONGODB_URI}`)
    console.log(error)
  })

module.exports = mongoose.model('Blog', blogSchema)