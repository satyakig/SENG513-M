import React from 'react';
import { Avatar, createStyles, makeStyles, Card, Typography, CardContent } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      paddingBottom: '20px',
      display: 'flex',
      flexDirection: (props: any) => (props.thisUser ? 'row-reverse' : 'row'),
      margin: (props: any) => (props.thisUser ? '0 0 0 auto' : '0 auto 0 0'),
      width: 'fit-content',
      maxWidth: '80%',
      borderRadius: 0,
      backgroundColor: 'inherit',
      boxShadow: 'none',
    },
    icon: {
      textTransform: 'uppercase',
      margin: (props: any) => (props.thisUser ? '0 0 0 5px' : '0 5px 0 0'),
    },
    details: {
      flexBasis: '75%',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'justify',
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    content: {
      width: 'auto',
      padding: '10px 10px 10px 15px !important',
      margin: (props: any) => (props.thisUser ? '0 0 0 auto' : '0 auto 0 0'),
    },
    cover: {
      flexBasis: '25%',
    },
  }),
);

const Message = (props: any) => {
  const classes = useStyles(props);

  return (
    <Card className={classes.card}>
      <Avatar className={classes.icon}>{props.name[0]}</Avatar>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            {props.date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.message}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default Message;
