const { PrismaClient } = require(".prisma/client");
const { Router } = require("express");

const protocolTypeRouter = Router();

protocolTypeRouter.get("/", async (req, res) => {
  const prisma = new PrismaClient();

  const subjects = await prisma.subject.findMany({
    orderBy: [
      {
        name: 'asc'
      }
    ]
  });

  res.status(200).send(subjects);

  await prisma.$disconnect();
});

protocolTypeRouter.post("/create", async (req, res) => {
  const prisma = new PrismaClient();
  const subject = req.body;

  await prisma.subject.create({
    data: subject,
  });

  res.status(201).send();

  await prisma.$disconnect();
});


protocolTypeRouter.put("/update/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const subject = req.body;
  const { id } = req.params;

  await prisma.subject.update({
    where: {
      id: Number.parseInt(id),
    },
    data: subject,
  });

  res.status(200).send();

  await prisma.$disconnect();
});

protocolTypeRouter.delete("/delete/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const { id } = req.params;

  await prisma.subject.delete({
    where: {
      id: Number.parseInt(id),
    },
  });

  res.status(200).send();

  await prisma.$disconnect();
});

protocolTypeRouter.get('/:id', async (req, res) => {
  const prisma = new PrismaClient()

  const { id } = req.params

  const subject = await prisma.subject.findUnique({
    where: {
      id: Number.parseInt(id)
    }
  })

  res.status(200).send(subject)

  await prisma.$disconnect()
})

module.exports = protocolTypeRouter;
