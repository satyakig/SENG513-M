import React from 'react';
import { Grid, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import Header from '../Header/Header';
import Members from '../Members/Members';
import Chat from '../Chat/Chat';
import Notifications from '../Notifications/Notifications';
import { appStyles } from './App.styles';
import './App.scss';

const useStyles = makeStyles(appStyles);

const App = (): JSX.Element => {
  const classes = useStyles();
  const mobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  return (
    <div>
      <Header color="dark" />
      <Notifications />
      {mobile ? (
        <Grid className={classes.main} container={true}>
          <Grid item={true} xs={12}>
            <Chat />
          </Grid>
        </Grid>
      ) : (
        <Grid className={classes.main} container={true}>
          <Grid item={true} xs={3}>
            <Members mobile={false} />
          </Grid>
          <Grid item={true} xs={9}>
            <Chat />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default App;
