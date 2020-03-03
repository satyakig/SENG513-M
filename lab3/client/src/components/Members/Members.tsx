import React, { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import moment, { unitOfTime } from 'moment-timezone';
import { UserModel } from 'redux/Models';
import { ReduxState } from 'redux/combinedReducer';
import CustomTypography from '../Typography/Typography';
import { membersStyles, memberStyles } from './Members.styles';

const membersStylesComp = makeStyles(membersStyles);
const memberStylesComp = makeStyles(memberStyles);

interface MemberProp {
  thisUser: UserModel;
  user: UserModel;
}

const Member = (props: MemberProp): JSX.Element => {
  const isThisUser = props.thisUser.isSameUser(props.user);
  const classes = memberStylesComp({
    isThisUser,
    colour: props.user.colour,
  });

  const [ago, setAgo] = useState('');

  function formatDate(): string {
    return moment(props.user.joinedOn).format('MMM D, YYYY');
  }

  const formatAgo = useCallback(() => {
    const timeFrames = ['months', 'weeks', 'hours', 'days', 'minutes', 'seconds'];

    const now = moment();
    const last = moment(props.user.lastActive);

    let diff = 0;
    let period = '';

    for (const frame of timeFrames) {
      period = frame;
      diff = now.diff(last, frame as unitOfTime.Diff);

      if (diff !== 0) {
        break;
      }
    }

    diff = diff < 1 ? 0 : diff;

    setAgo(`${diff} ${period} ago`);
  }, [props.user.lastActive]);

  useEffect(() => {
    formatAgo();

    const interval = setInterval(() => {
      formatAgo();
    }, 10000);

    return () => {
      window.clearInterval(interval);
    };
  }, [props.user.lastActive, formatAgo]);

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar>
        <Avatar variant="rounded" className={classes.avatar}>
          {props.user.initials}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.itemText}
        primary={props.user.name}
        secondary={
          <React.Fragment>
            {isThisUser ? null : (
              <Typography display="block" component="span" variant="caption">
                {`Active: ${ago}`}
              </Typography>
            )}

            <Typography display="block" component="span" variant="caption">
              {`Joined: ${formatDate()}`}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

const Members = (): JSX.Element => {
  const classes = membersStylesComp();

  const currentUser = useSelector((state: ReduxState) => {
    return state.currentUser;
  });

  const users = useSelector((state: ReduxState) => {
    return state.users;
  });

  const activeMembers = users.filter((user) => {
    return user.active && !user.isSameUser(currentUser);
  });

  const inactiveMembers = users.filter((user) => {
    return !user.active && !user.isSameUser(currentUser);
  });

  return (
    <List className={classes.friends}>
      <ListItem className={classes.listItem}>
        <ListItemText
          className={classes.itemText}
          primary={
            <CustomTypography type="muted">
              <span className={classes.title}>members</span>
            </CustomTypography>
          }
        />
      </ListItem>

      <Divider />
      <ListItem className={classes.listItem}>
        <ListItemText
          className={classes.itemText}
          primary={
            <CustomTypography type="success">
              <span className={classes.userStatus}>{`active (${activeMembers.length + 1})`}</span>
            </CustomTypography>
          }
        />
      </ListItem>
      <Divider />
      <Member thisUser={currentUser} user={currentUser} />
      {activeMembers.map((user, index) => {
        return <Member key={index} thisUser={currentUser} user={user} />;
      })}

      <Divider />
      <ListItem className={classes.listItem}>
        <ListItemText
          className={classes.itemText}
          primary={
            <CustomTypography type="muted">
              <span className={classes.userStatus}>{`offline (${inactiveMembers.length})`}</span>
            </CustomTypography>
          }
        />
      </ListItem>
      {inactiveMembers.map((user, index) => {
        return <Member key={index} thisUser={currentUser} user={user} />;
      })}
      <Divider />
    </List>
  );
};

export default Members;
