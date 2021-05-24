import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const getOne = async (id) => {
  const res = await axios.get(baseUrl+"/"+id)
  return res.data
}

const voteOne = async (obj) => {
  const response = await axios.put(baseUrl+"/"+obj.id, obj)
  return response.data
}

export default { getAll, createNew, getOne, voteOne }
