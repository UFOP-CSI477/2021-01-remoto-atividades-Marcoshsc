const jwt = require('jsonwebtoken')
const httpError = require('http-errors')
const { signRefreshToken } = require('./helper')

module.exports = (req, res, next) => {
  try {
    const tokenHeader = req.cookies.accessToken.split('Bearer ')[1]
    const decoded = jwt.verify(tokenHeader, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded
    signRefreshToken(req, res)
    next()
  } catch (err) {
    next(httpError(401))
  }
}