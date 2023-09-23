import PropTypes from 'prop-types';
import { useState } from 'react';

import { Typography, TextField, Button } from '@mui/material';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();

    handleLogin(username, password);

    setUsername('');
    setPassword('');
  };

  return (
    <form>
      <Typography variant="h6" gutterBottom>Login</Typography>

      <TextField id="username"
        fullWidth
        size="small"
        label="Username"
        variant="outlined"
        type="text"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
        sx={{ my: 2 }}
      />

      <TextField id="password"
        fullWidth
        size="small"
        label="Password"
        variant="outlined"
        type="text"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        sx={{ mb: 2 }}
      />

      <Button sx={{ mb: 2 }} type="submit" variant="contained" onClick={login} margin="normal">Login</Button>
    </form>
  );
};
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
