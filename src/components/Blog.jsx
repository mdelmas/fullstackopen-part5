import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Typography, Link, Box, IconButton, Button } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import PropTypes from 'prop-types';

const Blog = ({ blog, handleLike, handleDelete }) => {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);

  const user = useSelector((state) => state.user);

  if (!blog) return ;

  const style = {
    backgroundColor: open ? 'aliceblue' : 'whitesmoke',
    padding: 2,
    margin: 4,
  };

  const deleteBlog = () => {
    if (window.confirm(`remove blog ${blog.title} ?`)) {
      handleDelete(blog);
      navigate('/');
    }
  };

  const like = () => {
    if (!liked) {
      handleLike(blog);
      setLiked(true);
    }
  };

  return (
    <div>
      <Box sx={{ mb: 2 }} />
      <Typography variant="h6">{ blog.title }</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="body2">
        <Link href={ blog.url } underline="hover" color="inherit">
          { blog.url }
        </Link><br />

        Likes {`${blog.likes}`}
        <IconButton aria-label="like" onClick={like} color="error">
          { liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon /> }
        </IconButton>
        <br />

        {blog.author && (
          <>
            Added by {blog.author.username} <br />
          </>
        )}

        {blog.author && blog.author.username === user.username && (
          <Button sx={{ mt: 2 }} type="submit" variant="contained" onClick={deleteBlog}>Delete</Button>
        )}

      </Typography>
    </div>
  );
};
Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;
