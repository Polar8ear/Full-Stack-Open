require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT
const MONGODB_URI = NODE_ENV === 'test' || NODE_ENV === 'testFrontEnd'
  ?process.env.TEST_MONGODB_URI
  :process.env.MONGODB_URI

const SECRET = process.env.SECRET

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  NODE_ENV
}