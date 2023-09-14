import PropTypes from 'prop-types';
import { useState } from 'react';

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
      <h4>Create new blog</h4>
      <p>
        Title:
        <input type='text' name='title'
          value={ title }
          onChange={ (event) => setTitle(event.target.value) }
        />
      </p>
      <p>
        Url:
        <input type='text' name='url'
          value={ url }
          onChange={ (event) => setUrl(event.target.value) }
        />
      </p>
      <button type="submit" onClick={ createBlog }>Create</button>
    </form>
  );
};
BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired
};

export default BlogForm;