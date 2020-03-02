import React from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import Typography from '../Typography/Typography';
import { friendsStyles } from './Friends.styles';

const useStyles = makeStyles(friendsStyles);

const Friends = (): JSX.Element => {
  const classes = useStyles();

  return (
    <List className={classes.friends}>
      <ListItem className={classes.listItem}>
        <ListItemText
          className={classes.itemText}
          primary={
            <Typography type="muted">
              <span className={classes.title}>members</span>
            </Typography>
          }
        />
      </ListItem>
      <Divider />

      <ListItem className={classes.listItem}>
        <ListItemText
          className={classes.itemText}
          primary={
            <Typography type="success">
              <span className={classes.userStatus}>active</span>
            </Typography>
          }
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar variant="rounded" className={classes.orange}>
            A
          </Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.itemText} primary="A" secondary="Jan 9, 2014" />
      </ListItem>
      <Divider />

      <ListItem className={classes.listItem}>
        <ListItemText
          className={classes.itemText}
          primary={
            <Typography type="danger">
              <span className={classes.userStatus}>inactive</span>
            </Typography>
          }
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar variant="rounded" className={classes.purple}>
            B
          </Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.itemText} primary="B" secondary="Jan 9, 2014" />
      </ListItem>
      <Divider />

      <ListItem className={classes.listItem}>
        <ListItemText
          className={classes.itemText}
          primary={
            <Typography type="muted">
              <span className={classes.userStatus}>offline</span>
            </Typography>
          }
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar variant="rounded">C</Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.itemText} primary="C" secondary="Jan 9, 2014" />
      </ListItem>
      <Divider />
    </List>
  );
};

export default Friends;
