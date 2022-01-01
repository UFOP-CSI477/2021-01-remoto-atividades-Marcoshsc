import axios from 'axios'

export const getVotings = async () => {
  const response = await axios.get('http://localhost:3001/votings', { withCredentials: true })
  return response.data
}

export const createVoting = async (voting) => {
  const response = await axios.post('http://localhost:3001/votings/new', voting, { withCredentials: true })
  return response.data
}

export const deleteVoting = async (id) => {
  await axios.delete(`http://localhost:3001/votings/${id}`, { withCredentials: true })
}

export const getVoting = async (id) => {
  const response = await axios.get(`http://localhost:3001/votings/${id}`, { withCredentials: true })
  return response.data
}

export const vote = async (votingId, candidateId) => {
  await axios.post('http://localhost:3001/votings/vote', { votingId, candidateId }, { withCredentials: true })
}