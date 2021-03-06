import React from 'react';
import { makeStyles, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { notificationStyles } from './Notifications.styles';
import { removeNotificationAction } from '../../redux/Actions';

const useStyles = makeStyles(notificationStyles);

interface CustomSnackProps {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
  id: string;
}

const CustomSnack = (props: CustomSnackProps): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(removeNotificationAction(props.id));
  };

  return (
    <Snackbar
      open={true}
      onClose={handleClose}
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
  const notifications = useSelector((state: ReduxState) => {
    return state.notifications;
  });

  return (
    <div className={classes.container}>
      {notifications.slice(0, 4).map((notification, index) => {
        return (
          <CustomSnack
            key={index}
            id={notification.id}
            severity={notification.severity}
            message={notification.message}
          />
        );
      })}
    </div>
  );
};

export default Notifications;
