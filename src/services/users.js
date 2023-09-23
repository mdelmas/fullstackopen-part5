import axios from 'axios';
const baseUrl = 'http://localhost:3003';

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/api/users`);
  return response.data;
};

const login = async (credentials) => {
  const result = await axios.post(`${baseUrl}/api/login`, credentials);
  return result.data;
};

export default { getAll, login };
