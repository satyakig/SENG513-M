import React from 'react';
import moment from 'moment-timezone';
import { Avatar, makeStyles, Card, CardContent } from '@material-ui/core';
import { MessageModel, UserModel } from 'redux/Models';
import Typography from '../Typography/Typography';
import { messageStyles } from './Message.styles';

const useStyles = makeStyles(messageStyles);

interface MessageProps {
  message: MessageModel;
  user: UserModel;
}

const Message = (props: MessageProps) => {
  const isThisUser = props.message.isSameUser(props.user);

  const classes = useStyles({
    isThisUser,
    colour: props.message.byColour,
  });

  function formatDate(inp: number): string {
    return moment(inp).format('h:mma MMM D, YYYY');
  }

  return (
    <Card className={classes.card}>
      <Avatar className={classes.icon}>{props.message.byInitials}</Avatar>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography type="small" className={classes.date}>
            {formatDate(props.message.timestamp)}
          </Typography>
          <Typography>{props.message.message}</Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default Message;
