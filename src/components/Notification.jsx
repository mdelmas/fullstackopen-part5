import PropTypes from 'prop-types';

import { Alert } from '@mui/material';

export const NotificationType = {
  NONE: 0,
  ERROR: 1,
  SUCCESS: 2,
};

const Notification = ({ notification }) => {
  if (notification.type === NotificationType.NONE) {
    return null;
  }

  return (
    <Alert severity={ notification.type === NotificationType.ERROR ? 'error' : 'success'}>{notification.message}</Alert>
  );
};
Notification.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default Notification;
