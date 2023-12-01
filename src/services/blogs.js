import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async headers => {
  const response = await axios.get(baseUrl, { headers })
  return response.data
}

const create = async (headers, data) => {
  const response = await axios.post(baseUrl, data, { headers })
  return response.data
}

export default { getAll, create }