import PropTypes from 'prop-types';

const NotificationType = {
  NONE: 0,
  ERROR: 1,
  SUCCESS: 2
};

const Notification = ({ notification }) => {
  if (notification.type === NotificationType.NONE) {
    return null;
  }

  let style = {
    backgroundColor: notification.type === NotificationType.ERROR ? 'red' : 'green',
    color: 'white',
    fontSize: '20px',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };

  return <div style={ style }>{ notification.message }</div>;
};
Notification.propTypes = {
  notification: PropTypes.object.isRequired
};

export { NotificationType, Notification };