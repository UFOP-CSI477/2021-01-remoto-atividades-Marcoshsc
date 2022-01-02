const { PrismaClient } = require(".prisma/client");
const { Router } = require("express");

const votingRouter = Router()

votingRouter.get('/', async (req, res) => {
  const { id } = req.user
  const prisma = new PrismaClient()
  const votings = await prisma.voting.findMany({
    where: {
      ownerId: id
    },
    include: {
      candidates: true,
      votes: true
    }
  })
  const formattedVotings = votings.map(voting => ({
    ...voting,
    numberOfVoters: voting.votes.length,
    open: voting.end.getTime() > new Date() && voting.start.getTime() < new Date(),
    votes: undefined
  }))
  res.status(200).send(formattedVotings)
  prisma.$disconnect()
})

votingRouter.post('/new', async (req, res) => {
  const { id } = req.user
  const prisma = new PrismaClient()

  const voting = {
    title: req.body.title,
    description: req.body.description,
    start: new Date(req.body.start),
    end: new Date(req.body.end),
    identity: false
  } 

  const votingCreated = await prisma.voting.create({
    data: {
      ...voting,
      ownerId: id,
      candidates: {
        create: req.body.candidates
      }
    }
  })

  await prisma.$disconnect()
  res.status(201).send(votingCreated)
})

votingRouter.delete('/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id)
  const { id: userId } = req.user
  const prisma = new PrismaClient()
  const voting = await prisma.voting.findUnique({
    where: {
      id
    }
  })

  if(!voting) {
    res.status(400).send({
      message: "Votação não encontrada."
    })
    return
  }

  if(voting.ownerId !== userId) {
    res.status(400).send({
      message: "Você não pode excluir essa votação pois não é o criador."
    })
    return
  } 

  await prisma.voting.delete({
    where: {
      id
    }
  })

  await prisma.$disconnect()
  res.status(200).send()
})

votingRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const { id: userId } = req.user
  const prisma = new PrismaClient()

  const voting = await prisma.voting.findUnique({
    where: {
      id: Number.parseInt(id)
    },
    include: {
      candidates: true,
      votes: true
    }
  })

  if(!voting) {
    res.status(400).send({
      message: "Essa votação não existe."
    })
    return
  }

  const getWinner = () => {
    const votesPerCandidate = {}
    voting.candidates.forEach(candidate => {
      votesPerCandidate[candidate.id] = 0
    })
    voting.votes.forEach(vote => {
      votesPerCandidate[vote.candidateId] += 1
    })
    const voteValues = Object.values(votesPerCandidate)
    const greater = voteValues.sort()[voteValues.length - 1]
    const winners = Object.keys(votesPerCandidate).filter(candidateId => votesPerCandidate[candidateId] === greater)
    const winnersNumber = winners.map(el => Number.parseInt(el))
    return voting.candidates.filter(candidate => winnersNumber.includes(candidate.id))
  }

  const winners = voting.end.getTime() > new Date() ? undefined :  getWinner()
  const canVote = !voting.votes.map(vote => vote.userId).includes(userId)
  const votingStarted = voting.start.getTime() < new Date()

  const formattedVote = {
    ...voting,
    canVote: canVote && votingStarted,
    reason: !votingStarted ? "Essa votação ainda não começou." : "Você já registrou seu voto nessa votação.",
    winners,
    votes: undefined
  }
  res.status(200).send(formattedVote)

  prisma.$disconnect()
})

votingRouter.post('/vote', async (req, res) => {
  const { votingId, candidateId } = req.body
  const { id: userId } = req.user
  const prisma = new PrismaClient()

  const voting = await prisma.voting.findFirst({
    where: {
      id: votingId
    },
    include: {
      candidates: true,
      votes: true
    }
  })

  const canVote = !voting.votes.map(vote => vote.userId).includes(userId)

  if(!voting) {
    res.status(400).send({
      message: "Essa votação não existe."
    })
    return
  }

  if(!canVote) {
    res.status(400).send({
      message: "Você já votou nessa votação."
    })
    return
  }

  await prisma.votingUser.create({
    data: {
      candidateId: candidateId,
      userId: userId,
      votingId: votingId
    }
  })

  res.status(200).send()

  prisma.$disconnect()
})

module.exports = votingRouter