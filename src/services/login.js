import axios from 'axios';
const baseUrl = 'http://localhost:3003';

const login = async (credentials) => {
  console.log('in login', credentials);
  const result = await axios.post(`${baseUrl}/api/login`, credentials);
  console.log('result', result.data);
  return result.data;
}

export default { login };
  