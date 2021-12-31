const { Router } = require("express");

const votingRouter = Router()

votingRouter.get('/', (req, res) => {
  res.send({
    message: 'All ok'
  })
})

module.exports = votingRouter