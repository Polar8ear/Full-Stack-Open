import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = receivedToken => {
  token = `Bearer ${receivedToken}`
}

const removeToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization:token },
  }

  const response = await axios.post(baseUrl,newBlog,config)
  return response.data
}

const update = async (updatedBlog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`,updatedBlog)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization:token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response.status
}

const exportObject = {
  getAll,
  setToken,
  removeToken,
  create,
  update,
  remove,
}

export default exportObject