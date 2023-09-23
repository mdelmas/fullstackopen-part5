import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, useParams, useMatch } from 'react-router-dom';

import { Typography, Container, Box, AppBar, Toolbar, Card, CardContent, MenuItem, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { BlogList } from './components/BlogList';
import { UserList } from './components/UserList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import User from './components/User';
import Blog from './components/Blog';

import blogService from './services/blogs';

import { displayErrorNotification, displaySuccessNotification } from './reducers/notificationReducer';
import { addBlog, initializeBlogs, modifyBlog, deleteBlog } from './reducers/blogsReducer';
import { login, logout, retrieveUser } from './reducers/userReducer';
import { initializeUsers, addBlogToUser, deleteBlogFromUser } from './reducers/usersReducer';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => [...state.blogs].sort((b1, b2) => b2.likes - b1.likes));
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  const matchUser = useMatch('/users/:id');
  const displayedUser = matchUser ? users.find(user => user.id === matchUser.params.id) : null;

  const matchBlog = useMatch('/blogs/:id');
  const displayedBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null;

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    dispatch(retrieveUser());
  }, [dispatch]);

  const handleLogin = async (username, password) => {
    dispatch(login({ username, password }))
      .catch(error => dispatch(displayErrorNotification(`Error: ${error.message}`)));
  };

  const handleLogout = (event) => {
    event.preventDefault();

    dispatch(logout());
  };

  const handleCreateBlog = async (blog) => {
    try {
      const newBlog = await blogService.createBlog(blog, user.token);
      dispatch(addBlog(newBlog));
      dispatch(addBlogToUser(users, newBlog));

      dispatch(displaySuccessNotification(`New blog has been created : ${blog.title}`));
    } catch (error) {
      dispatch(displayErrorNotification(`Error: ${error.message}`));
    }
  };

  const handleLike = async (blogToUpdate) => {
    try {
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
      await blogService.modifyBlog(updatedBlog, user.token);

      dispatch(modifyBlog(updatedBlog));

      dispatch(displaySuccessNotification(`Liked blog : ${updatedBlog.title}`));
    } catch (error) {
      dispatch(displayErrorNotification(`Error: ${error.message}`));
    }
  };

  const handleDelete = async (blogToDelete) => {
    try {
      await blogService.deleteBlog(blogToDelete, user.token);
      dispatch(deleteBlog(blogToDelete));
      dispatch(deleteBlogFromUser(users, blogToDelete));

      dispatch(displaySuccessNotification(`Blog has been deleted : ${blogToDelete.title}`));
    } catch (error) {
      dispatch(displayErrorNotification(`Error: ${error.message}`));
    }
  };

  return (
    <>
      {!user &&
        <>
          <Card sx={{ mx: 'auto', maxWidth: 500, mt: 20 }}>
            <CardContent>
              <Notification notification={notification} />
              <LoginForm handleLogin={ handleLogin } />
            </CardContent>
          </Card>
        </>
      }

      {user &&
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar variant="dense">
                <MenuItem component={Link} to={'/'}>Blogs</MenuItem>
                <MenuItem component={Link} to={'/users'}>Users</MenuItem>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="body1" component="div">
                  { user.username } logged in
                </Typography>
                <IconButton aria-label="logout" color="inherit" onClick={ handleLogout }>
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Box>

          <Container>
            <Box sx={{ mb: 2 }} />
            <Typography variant="h4">Blogs</Typography>
            <Box sx={{ mb: 2 }} />

            <Notification notification={notification} />

            <Routes>
              <Route path='/users' element={<UserList users={ users } />} />
              <Route path='/users/:id' element={<User user={ displayedUser } />} />
              <Route path='/blogs/:id' element={
                <Blog
                  blog={ displayedBlog }
                  handleLike={ handleLike }
                  handleDelete={ handleDelete }
                />
              } />
              <Route path='/' element={
                <BlogList
                  blogs={ blogs }
                  handleCreateBlog={handleCreateBlog }
                />
              } />
            </Routes>
          </Container>
        </>
      }
    </>
  );
};

export default App;
