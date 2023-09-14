import { useState } from 'react';
import PropTypes from 'prop-types';

const Toggable = ({
  buttonLabel,
  children
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      { !visible &&
        <button onClick={ toggleVisibility }>{ buttonLabel }</button>
      }

      { visible &&
        <div>
          { children }
          <button onClick={ toggleVisibility }>cancel</button>
        </div>
      }
    </>
  );
};
Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default Toggable;