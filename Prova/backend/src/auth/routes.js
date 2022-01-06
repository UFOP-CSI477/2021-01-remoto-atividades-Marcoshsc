const jwt = require("jsonwebtoken");
const httpError = require("http-errors");
const { Router } = require("express");
const { signAccessToken } = require("./helper");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).send({
        message: "Informe todos os dados.",
      });
      await prisma.$disconnect();
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(401).send({
        message: "Usuário não encontrado.",
      });
      await prisma.$disconnect();
      return;
    }

    const valid = bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).send({
        message: "Login incorreto.",
      });
      await prisma.$disconnect();
      return;
    }

    const bodyPayload = {
      email: user.email,
      id: user.id,
    };
    signAccessToken(res, bodyPayload);
    await prisma.$disconnect();
    return res.status(200).send(user);
  } catch (err) {
    res.status(500).send();
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const prisma = new PrismaClient();
    const sameEmail = await prisma.user.findMany({
      where: {
        email: email,
      },
    });
    if (sameEmail.length) {
      res.status(400).send({
        message: "Usuário com o mesmo email já existe.",
      });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    await prisma.$disconnect();
    const bodyPayload = {
      email: user.email,
      id: user.id,
    };
    signAccessToken(res, bodyPayload);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send();
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = authRouter;
