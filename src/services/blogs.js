import axios from 'axios'
const baseUrl = 'http://localhost:3003';

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/blogs`)
  return request.then(response => response.data)
}

export default { getAll }