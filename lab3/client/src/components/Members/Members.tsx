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
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { UserCompType } from 'redux/Models';
import { ReduxState } from 'redux/combinedReducer';
import Typography from '../Typography/Typography';
import { membersStyles, memberStyles } from './Members.styles';

const membersStylesComp = makeStyles(membersStyles);
const memberStylesComp = makeStyles(memberStyles);

const Member = (props: UserCompType): JSX.Element => {
  const classes = memberStylesComp(props);

  function formatDate(inp: number): string {
    return moment(inp).format('MMM D, YYYY');
  }

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar>
        <Avatar variant="rounded" className={classes.avatar}>
          {props.initials}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.itemText}
        primary={props.name}
        secondary={`Joined: ${formatDate(props.joinedOn)}`}
      />
    </ListItem>
  );
};

const Members = (): JSX.Element => {
  const classes = membersStylesComp();
  const users = useSelector((state: ReduxState) => {
    return state.users;
  });

  const activeMembers = users.filter((user) => {
    return user.active;
  });

  const inactiveMembers = users.filter((user) => {
    return !user.active;
  });

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

      <ListItem className={classes.listItem}>
        <ListItemText
          className={classes.itemText}
          primary={
            <Typography type="success">
              <span className={classes.userStatus}>{`active (${activeMembers.length})`}</span>
            </Typography>
          }
        />
      </ListItem>
      {activeMembers.map((user, index) => {
        return <Member key={index} {...user} />;
      })}
      <Divider />

      <ListItem className={classes.listItem}>
        <ListItemText
          className={classes.itemText}
          primary={
            <Typography type="muted">
              <span className={classes.userStatus}>{`offline (${inactiveMembers.length})`}</span>
            </Typography>
          }
        />
      </ListItem>
      {inactiveMembers.map((user, index) => {
        return <Member key={index} {...user} />;
      })}
      <Divider />
    </List>
  );
};

export default Members;
