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

  const vacina = await prisma.vacina.findUnique({
    where: {
      id: record.vacinaId
    }
  })

  if(vacina.doses === 0) {
    res.status(400).send({
      message: 'Não existem doses para serem aplicadas dessa vacina.'
    })
    return
  }

  const date = new Date(record.data)
  date.setDate(date.getDate() + 1)
  const updatedRecord = await prisma.registro.create({
    data: { ...record, data: date },
  });
  await prisma.vacina.update({
    where: {
      id: updatedRecord.vacinaId
    },
    data: { ...vacina, doses: vacina.doses - 1 }
  })

  res.status(201).send();

  await prisma.$disconnect();
});


recordRouter.put("/update/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const record = req.body;
  const { id } = req.params;

  const vacina = await prisma.vacina.findUnique({
    where: {
      id: record.vacinaId
    }
  })

  if(vacina.doses === 0) {
    res.status(400).send({
      message: 'Não existem doses para serem aplicadas dessa vacina.'
    })
    return
  }

  const old = await prisma.registro.findUnique({
    where: {
      id: Number.parseInt(id)
    },
    include: {
      vacina: true
    }
  })


  const date = new Date(record.data)
  date.setDate(date.getDate() + 1)
  const newRecord = await prisma.registro.update({
    where: {
      id: Number.parseInt(id),
    },
    data: { ...record, data: date },
  });

  await prisma.vacina.update({
    where: {
      id: record.vacinaId
    },
    data: { ...vacina, doses: vacina.doses - 1 }
  })

  if(old.vacinaId !== newRecord.vacinaId) {
    await prisma.vacina.update({
      where: {
        id: old.vacinaId
      },
      data: { ...old.vacina, doses: old.vacina.doses + 1 }
    })
  }

  res.status(200).send();

  await prisma.$disconnect();
});

recordRouter.delete("/delete/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const { id } = req.params;

  const element = await prisma.registro.findUnique({
    where: {
      id: Number.parseInt(id)
    },
    include: {
      vacina: true
    }
  })

  await prisma.vacina.update({
    where: {
      id: element.vacinaId
    },
    data: { ...element.vacina, doses: element.vacina.doses + 1 }
  })

  await prisma.registro.delete({
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

  const record = await prisma.registro.findUnique({
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
