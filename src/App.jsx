import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { NotificationType, Notification } from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ type: NotificationType.NONE });

  console.log('user', user);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    console.log('storedUser', storedUser);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (event) => {
    event.preventDefault();

    try {
      let receivedUser = await loginService.login({ username, password });
      setUser(receivedUser);
      window.localStorage.setItem('user', JSON.stringify(receivedUser));

      setUsername('');
      setPassword('');  
    } catch (error) {
      setNotification({ message: `Error: ${error.message}`, type: NotificationType.ERROR });
      setTimeout(() => setNotification({ type: NotificationType.NONE }), 4000);
    }
  };

  const logout = async (event) => {
    event.preventDefault();

    setUser(null);
    window.localStorage.removeItem('user');
  };

  const loginForm = () => (
    <form>
      <p>
        Username: 
        <input type='text' name='username' 
          value={ username } 
          onChange={ event => setUsername(event.target.value) }
        />
      </p>
      <p>
        Password: 
        <input type='text' name='password' 
          value={ password } 
          onChange={ event => { setPassword(event.target.value) } }
        />
      </p>
      <button type="submit" onClick={ login }>login</button>
    </form>
  )

  const blogDisplay = () => (
    <div>
      <h2>blogs</h2>
        <p>
          { user.username } logged in
          <button onClick={ logout }>Logout</button>
        </p>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <>
      <Notification notification={ notification } />

      { !user && loginForm() }
      { user && blogDisplay() }
    </>
  )
}

export default App