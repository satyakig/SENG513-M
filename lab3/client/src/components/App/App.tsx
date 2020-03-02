import React from 'react';
import { createStyles, Grid, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import Header from '../Header/Header';
import './App.scss';
import Friends from '../Friends/Friends';
import Chat from '../Chat/Chat';
import Notifications from '../Notifications/Notifications';

const landingPageStyle = () =>
  createStyles({
    main: {
      margin: '0',
      width: '100%',
      height: 'calc(100vh - 70px)',
      overflow: 'hidden',
      boxShadow:
        '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    },
  });

const useStyles = makeStyles(landingPageStyle);

const App = (): JSX.Element => {
  const classes = useStyles();
  const mobile = useMediaQuery(useTheme().breakpoints.down('xs'));

  return (
    <div>
      <Header color="dark" brand="Satyaki Ghosh" fixed={false} absolute={false} />
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
            <Friends />
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
