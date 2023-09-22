import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { BlogList } from './components/BlogList';
import LoginForm from './components/LoginForm';
import { Notification } from './components/Notification';

import blogService from './services/blogs';

import { displayErrorNotification, displaySuccessNotification } from './reducers/notificationReducer';
import { addBlog, initializeBlogs, modifyBlog, deleteBlog } from './reducers/blogsReducer';
import { login, logout, retrieveUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => [...state.blogs].sort((b1, b2) => b2.likes - b1.likes));
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(retrieveUser());
  }, []);

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

      dispatch(displaySuccessNotification(`Blog has been deleted : ${blogToDelete.title}`));
    } catch (error) {
      dispatch(displayErrorNotification(`Error: ${error.message}`));
    }
  };

  return (
    <>
      <Notification notification={notification} />

      {!user && <LoginForm handleLogin={handleLogin} />}

      {user && (
        <BlogList
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          handleCreateBlog={handleCreateBlog}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default App;
