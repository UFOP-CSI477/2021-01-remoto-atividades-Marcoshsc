const { PrismaClient } = require(".prisma/client");
const { Router } = require("express");

const peopleRouter = Router();

peopleRouter.get("/", async (req, res) => {
  const prisma = new PrismaClient();

  const peoples = await prisma.pessoa.findMany({
    orderBy: [
      {
        nome: 'asc'
      }
    ]
  });

  res.status(200).send(peoples);

  await prisma.$disconnect();
});

peopleRouter.post("/create", async (req, res) => {
  const prisma = new PrismaClient();
  const people = req.body;

  await prisma.pessoa.create({
    data: { ...people, dataNascimento: new Date(people.dataNascimento)},
  });

  res.status(201).send();

  await prisma.$disconnect();
});


peopleRouter.put("/update/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const people = req.body;
  const { id } = req.params;

  await prisma.pessoa.update({
    where: {
      id: Number.parseInt(id),
    },
    data: { ...people, dataNascimento: new Date(people.dataNascimento)},
  });

  res.status(200).send();

  await prisma.$disconnect();
});

peopleRouter.delete("/delete/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const { id } = req.params;

  await prisma.pessoa.delete({
    where: {
      id: Number.parseInt(id),
    },
  });

  res.status(200).send();

  await prisma.$disconnect();
});

peopleRouter.get('/:id', async (req, res) => {
  const prisma = new PrismaClient()

  const { id } = req.params

  const people = await prisma.pessoa.findUnique({
    where: {
      id: Number.parseInt(id)
    }
  })

  res.status(200).send(people)

  await prisma.$disconnect()
})

module.exports = peopleRouter;
