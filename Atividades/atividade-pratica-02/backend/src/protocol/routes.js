const { PrismaClient } = require(".prisma/client");
const { Router } = require("express");

const protocolRouter = Router();

protocolRouter.get("/", async (req, res) => {
  const prisma = new PrismaClient();

  const protocols = await prisma.request.findMany({
    include: {
      user: true,
      subject: true
    }
  });

  res.status(200).send(protocols);

  await prisma.$disconnect();
});

protocolRouter.post("/create", async (req, res) => {
  const prisma = new PrismaClient();
  const protocol = req.body;

  await prisma.request.create({
    data: { ...protocol, date: new Date(protocol.date)},
  });

  res.status(201).send();

  await prisma.$disconnect();
});


protocolRouter.put("/update/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const protocol = req.body;
  const { id } = req.params;

  await prisma.request.update({
    where: {
      id: Number.parseInt(id),
    },
    data: { ...protocol, date: new Date(protocol.date)},
  });

  res.status(200).send();

  await prisma.$disconnect();
});

protocolRouter.delete("/delete/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const { id } = req.params;

  await prisma.request.delete({
    where: {
      id: Number.parseInt(id),
    },
  });

  res.status(200).send();

  await prisma.$disconnect();
});

protocolRouter.get('/:id', async (req, res) => {
  const prisma = new PrismaClient()

  const { id } = req.params

  const protocol = await prisma.request.findUnique({
    where: {
      id: Number.parseInt(id)
    },
    include: {
      user: true,
      subject: true
    }
  })

  res.status(200).send(protocol)

  await prisma.$disconnect()
})

module.exports = protocolRouter;
