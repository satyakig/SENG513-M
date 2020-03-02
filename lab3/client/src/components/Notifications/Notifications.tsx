import React, { useState } from 'react';
import { makeStyles, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { notificationStyles } from './Notifications.styles';

const useStyles = makeStyles(notificationStyles);

interface CustomSnackProps {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
  id: number;
}

const CustomSnack = (props: CustomSnackProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={10000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      className={classes.notification}
    >
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={props.severity}>
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
};

const Notifications = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CustomSnack id={0} severity="warning" message="One" />
      <CustomSnack id={1} severity="success" message="Contrary to popular belief" />
    </div>
  );
};

export default Notifications;
