const jwt = require('jsonwebtoken')
const httpError = require('http-errors')

const signAccessToken = (res, payload) => {
  if (payload) {
    const accessToken = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ ...payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '90d' })
    res.cookie('refreshToken', `${refreshToken}`, { expired: 86400 * 90, httpOnly: true })
    res.cookie('accessToken', `Bearer ${accessToken}`, { expired: 60 * 15, httpOnly: true })
    return { accessToken }
  }
}

const signRefreshToken = (req, res) => {
  const getToken = req.cookies.refreshToken
  if (getToken) {
    const { id, username } = jwt.verify(getToken, process.env.REFRESH_TOKEN_SECRET)
    const accessToken = jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    res.cookie('accessToken', `Bearer ${accessToken}`, { expired: 60 * 15, httpOnly: true })
    return { accessToken }
  }
}

module.exports = {
  signAccessToken, signRefreshToken
}
