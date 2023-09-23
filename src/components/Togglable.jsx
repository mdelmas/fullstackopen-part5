import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Box } from '@mui/material';

const Toggable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <Box sx={{ bgcolor: 'whitesmoke', padding: '10px', borderRadius: 2 }}>
      {!visible && <Button variant="text" onClick={toggleVisibility}>{buttonLabel}</Button>}

      {visible && (
        <>
          {children}
          <Button variant="outlined" onClick={toggleVisibility}>Cancel</Button>
        </>
      )}
    </Box>
  );
};
Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default Toggable;
