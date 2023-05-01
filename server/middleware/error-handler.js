const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong',
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if (err.name == 'ValidationError') {
    customError.msg = Object.values(err.errors).map(value => value.message).join(', ')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if (err.name == 'CastError') {
    customError.msg = `No item found with id: ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }

  if (err.code && err.code == 11000) {
    customError.msg = `Duplicate field value entered for ${Object.keys(err.keyValue)} field, please choose another`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
