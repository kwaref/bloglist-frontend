import axios from 'axios'
const baseUrl = '/api/login'

const login = accessData => {
  const request = axios.post(baseUrl, accessData)
  return request.then(response => response.data)
}

export default { login }