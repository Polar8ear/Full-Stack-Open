import axios from 'axios'

const baseURL = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post(baseURL, newAnecdote)
  return response.data
}

const vote = async (anecdote) => {
  const url = `${baseURL}/${anecdote.id}`
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(url, votedAnecdote)
  return response.status
}

const exportingObject = {
  getAll,
  createNew,
  vote,
}

export default exportingObject
