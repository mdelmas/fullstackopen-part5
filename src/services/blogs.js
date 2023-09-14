import axios from 'axios';
const baseUrl = 'http://localhost:3003';

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/api/blogs`);
  return response.data;
};

const createBlog = async (newBlog, token) => {
  const response = await axios.post(
    `${baseUrl}/api/blogs`,
    newBlog,
    { headers: { Authorization: `bearer ${token}` } }
  );
  return response.data;
};

const modifyBlog = async (updatedBlog, token) => {
  const response = await axios.put(
    `${baseUrl}/api/blogs/${updatedBlog.id}`,
    { ...updatedBlog, author: updatedBlog.author?.id },
    { headers: { Authorization: `bearer ${token}` } }
  );
  return response.data;
};

const deleteBlog = async (blogToDelete, token) => {
  const response = await axios.delete(
    `${baseUrl}/api/blogs/${blogToDelete.id}`,
    { headers: { Authorization: `bearer ${token}` } }
  );
  return response.data;
};

export default { getAll, createBlog, modifyBlog, deleteBlog };