import PropTypes from 'prop-types';
import { useState } from 'react';

import { Button, Typography, TextField } from '@mui/material';

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = (event) => {
    event.preventDefault();

    handleCreateBlog({ title, url });

    setTitle('');
    setUrl('');
  };

  return (
    <form>
      <Typography variant="h6" gutterBottom>Create new blogs</Typography>
      <TextField
        fullWidth
        size="small"
        label="Title"
        variant="outlined"
        type="text"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        size="small"
        label="Url"
        variant="outlined"
        type="text"
        name="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="Url"
        sx={{ mb: 2 }}
      />
      <Button sx={{ mb: 2 }} type="submit" variant="contained" onClick={createBlog} margin="normal">Create</Button>
    </form>
  );
};
BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
};

export default BlogForm;
