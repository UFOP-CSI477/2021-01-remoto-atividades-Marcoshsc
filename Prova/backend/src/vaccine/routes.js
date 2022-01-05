const { PrismaClient } = require(".prisma/client");
const { Router } = require("express");

const vaccineRouter = Router();

vaccineRouter.get("/", async (req, res) => {
  const prisma = new PrismaClient();

  const vaccines = await prisma.vacina.findMany({
    orderBy: [
      {
        nome: 'asc'
      }
    ]
  });

  res.status(200).send(vaccines);

  await prisma.$disconnect();
});

vaccineRouter.post("/create", async (req, res) => {
  const prisma = new PrismaClient();
  const vaccine = req.body;

  await prisma.vacina.create({
    data: vaccine  
  });

  res.status(201).send();

  await prisma.$disconnect();
});


vaccineRouter.put("/update/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const vaccine = req.body;
  const { id } = req.params;

  await prisma.vacina.update({
    where: {
      id: Number.parseInt(id),
    },
    data: vaccine
  });

  res.status(200).send();

  await prisma.$disconnect();
});

vaccineRouter.delete("/delete/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const { id } = req.params;

  await prisma.vacina.delete({
    where: {
      id: Number.parseInt(id),
    },
  });

  res.status(200).send();

  await prisma.$disconnect();
});

vaccineRouter.get('/:id', async (req, res) => {
  const prisma = new PrismaClient()

  const { id } = req.params

  const vaccine = await prisma.vacina.findUnique({
    where: {
      id: Number.parseInt(id)
    }
  })

  res.status(200).send(vaccine)

  await prisma.$disconnect()
})

module.exports = vaccineRouter;
