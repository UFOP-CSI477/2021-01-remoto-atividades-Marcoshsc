const { PrismaClient } = require(".prisma/client");
const { Router } = require("express");

const recordRouter = Router();

recordRouter.get("/", async (req, res) => {
  const prisma = new PrismaClient();

  const records = await prisma.registro.findMany({
    include: {
      pessoa: true,
      vacina: true,
      unidade: true
    },
    orderBy: [
      {
        data: 'asc'
      }
    ]
  });

  res.status(200).send(records);

  await prisma.$disconnect();
});

recordRouter.post("/create", async (req, res) => {
  const prisma = new PrismaClient();
  const record = req.body;

  await prisma.registro.create({
    data: { ...record, date: new Date(record.date)},
  });

  res.status(201).send();

  await prisma.$disconnect();
});


recordRouter.put("/update/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const record = req.body;
  const { id } = req.params;

  await prisma.registro.update({
    where: {
      id: Number.parseInt(id),
    },
    data: { ...record, date: new Date(record.data)},
  });

  res.status(200).send();

  await prisma.$disconnect();
});

recordRouter.delete("/delete/:id", async (req, res) => {
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

recordRouter.get('/:id', async (req, res) => {
  const prisma = new PrismaClient()

  const { id } = req.params

  const record = await prisma.request.findUnique({
    where: {
      id: Number.parseInt(id)
    },
    include: {
      vacina: true,
      pessoa: true,
      unidade: true
    }
  })

  res.status(200).send(record)

  await prisma.$disconnect()
})

module.exports = recordRouter;
