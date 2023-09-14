import PropTypes from 'prop-types';
import { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();

    handleLogin(username, password);

    setUsername('');
    setPassword('');  
  }

  return (
    <form>
      <p>
        Username: 
        <input type='text' name='username' 
          value={ username } 
          onChange={ (event) => setUsername(event.target.value) }
        />
      </p>
      <p>
        Password: 
        <input type='text' name='password' 
          value={ password } 
          onChange={ (event) => setPassword(event.target.value) }
        />
      </p>
      <button type="submit" onClick={ login }>login</button>
    </form>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func,
}

export default LoginForm;