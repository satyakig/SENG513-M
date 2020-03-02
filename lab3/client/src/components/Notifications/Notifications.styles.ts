import { createStyles, Theme } from '@material-ui/core';

export const notificationStyles = ({ spacing }: Theme) =>
  createStyles({
    container: {
      position: 'absolute',
      top: '20px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      maxHeight: '70vh',
      overflow: 'hidden',
    },
    notification: {
      top: 0,
      position: 'relative',
      marginBottom: '20px',
    },
    root: {},
  });
