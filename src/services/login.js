import axios from 'axios';
const baseUrl = 'http://localhost:3003';

const login = async (credentials) => {
  const result = await axios.post(`${baseUrl}/api/login`, credentials);
  return result.data;
};

export default { login };
