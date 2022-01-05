const { PrismaClient } = require(".prisma/client");
const { Router } = require("express");

const unitRouter = Router();

unitRouter.get("/", async (req, res) => {
  const prisma = new PrismaClient();

  const units = await prisma.unidade.findMany({
    orderBy: [
      {
        nome: 'asc'
      }
    ]
  });

  res.status(200).send(units);

  await prisma.$disconnect();
});

unitRouter.post("/create", async (req, res) => {
  const prisma = new PrismaClient();
  const unit = req.body;

  await prisma.unidade.create({
    data: { ...unit, dataNascimento: new Date(unit.dataNascimento)},
  });

  res.status(201).send();

  await prisma.$disconnect();
});


unitRouter.put("/update/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const unit = req.body;
  const { id } = req.params;

  await prisma.unidade.update({
    where: {
      id: Number.parseInt(id),
    },
    data: { ...unit, dataNascimento: new Date(unit.dataNascimento)},
  });

  res.status(200).send();

  await prisma.$disconnect();
});

unitRouter.delete("/delete/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const { id } = req.params;

  await prisma.unidade.delete({
    where: {
      id: Number.parseInt(id),
    },
  });

  res.status(200).send();

  await prisma.$disconnect();
});

unitRouter.get('/:id', async (req, res) => {
  const prisma = new PrismaClient()

  const { id } = req.params

  const unit = await prisma.unidade.findUnique({
    where: {
      id: Number.parseInt(id)
    }
  })

  res.status(200).send(unit)

  await prisma.$disconnect()
})

module.exports = unitRouter;
