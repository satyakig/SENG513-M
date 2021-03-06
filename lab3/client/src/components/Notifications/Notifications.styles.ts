import { createStyles } from '@material-ui/core';

export const notificationStyles = () =>
  createStyles({
    container: {
      position: 'absolute',
      top: '70px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      maxHeight: '50vh',
      overflow: 'hidden',
    },
    notification: {
      top: 0,
      position: 'relative',
      marginBottom: '10px',
      maxWidth: '75%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  });
