import axios from 'axios'

const baseURL = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  console.log(response)
  return response.data
}

const exportingObject = { getAll }

export default exportingObject
