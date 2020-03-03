import React, { useState } from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';
import { Socket } from 'Socket';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { CustomButton } from '../CustomButton/CustomButton';
import Message from '../Message/Message';
import { chatStyles } from './Chat.styles';

const useStyles = makeStyles(chatStyles);

const Chat = (): JSX.Element => {
  const classes = useStyles();

  const user = useSelector((state: ReduxState) => {
    return state.currentUser;
  });

  const messages = useSelector((state: ReduxState) => {
    return state.messages;
  });

  const [message, setMessage] = useState('');
  const instance = Socket.getInstance();

  function changeMessage(event: React.ChangeEvent<HTMLInputElement>): void {
    setMessage(event.target.value);
  }

  function submit() {
    if (message.length > 0) {
      instance.newMessage({
        message,
        id: user.id,
      });
    }

    setMessage('');
  }

  return (
    <div className={classes.chat}>
      <div className={classes.messages}>
        {messages.map((message, index) => {
          return <Message key={index} message={message} user={user} />;
        })}
      </div>
      <div className={classes.textRow}>
        <div className={classes.textCell}>
          <TextField
            className={classes.textBox}
            placeholder="Type a message..."
            fullWidth={true}
            multiline={true}
            variant="outlined"
            margin="dense"
            rows={4}
            onChange={changeMessage}
            value={message}
          />
        </div>
        <div className={classes.buttonCell}>
          <CustomButton className={classes.buttonIcon} color="github" onClick={submit}>
            <TelegramIcon />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Chat;
