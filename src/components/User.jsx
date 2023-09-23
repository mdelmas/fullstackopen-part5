import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Typography, Box, IconButton, Button, List, ListItemButton, ListItemText, Divider } from '@mui/material';

const User = ({ user }) => {
  if (!user) return ;

  return (
    <div>
      <Box sx={{ mb: 2 }} />
      <Typography variant="h5">{ user.username }</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="body1">Added blogs</Typography>

      <List>
        {user.blogs.map((blog, i) => <span key={i}>
          <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
            <ListItemText primary={blog.title}  sx={{ textDecoration: 'none' }} color="inherit" />
          </ListItemButton>
          { i < user.blogs.length - 1 && <Divider /> }
        </span>)}
      </List>
    </div>
  );
};
User.propTypes = {
  user: PropTypes.object,
};

export default User;
