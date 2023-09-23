import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';

import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = ({
  blogs,
  handleCreateBlog,
}) => {
  return (
    <div>
      <Togglable buttonLabel="Add blog">
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>

      <List>
        {blogs.map((blog, i) => <span key={i}>
          <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
            <ListItemText primary={blog.title}  sx={{ textDecoration: 'none' }} color="inherit" />
          </ListItemButton>
          { i < blogs.length - 1 && <Divider /> }
        </span>)}
      </List>
    </div>
  );
};
BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleCreateBlog: PropTypes.func.isRequired,
};

export { BlogList };
