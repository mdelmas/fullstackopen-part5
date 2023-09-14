import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import { NotificationType, Notification } from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ type: NotificationType.NONE });

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      let receivedUser = await loginService.login({ username, password });
      setUser(receivedUser);
      window.localStorage.setItem('user', JSON.stringify(receivedUser));
    } catch (error) {
      setNotification({ message: `Error: ${error.message}`, type: NotificationType.ERROR });
      setTimeout(() => setNotification({ type: NotificationType.NONE }), 4000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    setUser(null);
    window.localStorage.removeItem('user', null);
  };

  const handleCreateBlog = async (blog) => {
    try {
      const newBlog = await blogService.createBlog(blog, user.token);
      setBlogs(blogs.concat(newBlog));

      setNotification({ message: `New blog has been created : ${blog.title}`, type: NotificationType.SUCCESS });
      setTimeout(() => setNotification({ type: NotificationType.NONE }), 4000);
    } catch (error) {
      setNotification({ message: `Error: ${error.message}`, type: NotificationType.ERROR });
      setTimeout(() => setNotification({ type: NotificationType.NONE }), 4000);
    }
  };

  const handleLike = async (updatedBlog) => {
    try {
      updatedBlog.likes += 1;
      await blogService.modifyBlog(updatedBlog, user.token);

      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog));
    } catch (error) {
      setNotification({ message: `Error: ${error.message}`, type: NotificationType.ERROR });
      setTimeout(() => setNotification({ type: NotificationType.NONE }), 4000);
    }
  };

  const handleDelete = async (blogToDelete) => {
    try {
      await blogService.deleteBlog(blogToDelete, user.token);
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id));

      setNotification({ message: `Blog has been deleted : ${blogToDelete.title}`, type: NotificationType.SUCCESS });
      setTimeout(() => setNotification({ type: NotificationType.NONE }), 4000);
    } catch (error) {
      setNotification({ message: `Error: ${error.message}`, type: NotificationType.ERROR });
      setTimeout(() => setNotification({ type: NotificationType.NONE }), 4000);
    }
  };

  return (
    <>
      <Notification notification={ notification } />

      { !user &&
        <LoginForm handleLogin={ handleLogin } /> }

      { user &&
        <BlogList
          blogs={ blogs }
          user={ user }
          handleLogout={ handleLogout }
          handleCreateBlog={ handleCreateBlog }
          handleLike={ handleLike }
          handleDelete={ handleDelete }
        />
      }
    </>
  );
};

export default App;