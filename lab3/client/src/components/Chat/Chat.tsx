import React, { useState } from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';
import { CustomButton } from '../CustomButton/CustomButton';
import Message from '../Message/Message';
import { chatStyles } from './Chat.styles';
import { MESSAGES } from './Data';

const useStyles = makeStyles(chatStyles);

const Chat = (): JSX.Element => {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  function changeMessage(event: React.ChangeEvent<HTMLInputElement>): void {
    setMessage(event.target.value);
  }

  return (
    <div className={classes.chat}>
      <div className={classes.messages}>
        {MESSAGES.map((message, index) => {
          return <Message key={index} {...message} />;
        })}
      </div>
      <div className={classes.textRow}>
        <div className={classes.textCell}>
          <TextField
            className={classes.textBox}
            placeholder="Type a message..."
            autoFocus={true}
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
          <CustomButton className={classes.buttonIcon} color="github">
            <TelegramIcon />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Chat;
