const { PrismaClient } = require("@prisma/client");
const { Router } = require("express");

const userRouter = Router();

userRouter.get("/me", async (req, res) => {
  try {
    const prisma = new PrismaClient();

    const { id } = req.user;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    await prisma.$disconnect();
    res.status(200).send({ ...user, password: undefined });
  } catch (err) {
    res.status(500).send();
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany({
      orderBy: [
        {
          name: "asc",
        },
      ],
    });

    await prisma.$disconnect();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = userRouter;
