const { PrismaClient } = require("@prisma/client");
const { Router } = require("express");

const userRouter = Router()

userRouter.get('/me', async (req, res) => {
  const prisma = new PrismaClient()

  const { id } = req.user
  const user = await prisma.user.findUnique({
    where: {
      id: id
    } })

  await prisma.$disconnect()
  res.status(200).send({ ...user, password: undefined })
})

userRouter.get('/', async (req, res) => {
  const prisma = new PrismaClient()

  const users = await prisma.user.findMany({
    orderBy: [
      {
        name: 'asc'
      }
    ]
  })

  await prisma.$disconnect()
  res.status(200).send(users)
})

module.exports = userRouter