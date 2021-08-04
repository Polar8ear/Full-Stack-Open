const logger = require('./logger')
const config = require('./config')
const User = require('../models/user')

const jwt = require('jsonwebtoken')


const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request,_response,next) => {
  const authorization = request.get('authorization')
  request.token = authorization && authorization.toLowerCase().startsWith('bearer ')
    ?authorization.substring(7)
    :null

  next()
}

const userExtractor = async (request,_response,next) => {
  if(request.token){
    const decodedToken = jwt.verify(request.token,config.SECRET)
    request.user = await User.findById(decodedToken.id)
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}