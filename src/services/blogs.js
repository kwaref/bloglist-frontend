import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = headers => {
  const request = axios.get(baseUrl, { headers })
  return request.then(response => response.data)
}

export default { getAll }