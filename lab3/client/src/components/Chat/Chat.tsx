import React, { useState, useEffect, useCallback } from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import TelegramIcon from '@material-ui/icons/Telegram';
import { Socket } from 'Socket';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { NotificationModel } from 'redux/Models';
import { CustomButton } from '../CustomButton/CustomButton';
import Message from '../Message/Message';
import { chatStyles } from './Chat.styles';
import { addNotificationAction } from '../../redux/Actions';

const useStyles = makeStyles(chatStyles);

const NICK = '/nick';
const NICK_COLOR = '/nickcolor';
const NICK_COLOUR = '/nickcolour';
const SLASH = '/';

const Chat = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state: ReduxState) => {
    return state.currentUser;
  });

  const messages = useSelector((state: ReduxState) => {
    return state.messages;
  });

  const [message, setMessage] = useState('');

  function changeMessage(event: React.ChangeEvent<HTMLInputElement>): void {
    setMessage(event.target.value);
  }

  const submit = useCallback(() => {
    if (message.startsWith(SLASH)) {
      const newMessage = message.trim();

      if (newMessage.startsWith(`${NICK_COLOR} `)) {
        const colour = newMessage.split(NICK_COLOR)[1].trim();
        Socket.getInstance().colourChange(colour);
      } else if (newMessage.startsWith(`${NICK_COLOUR} `)) {
        const colour = newMessage.split(NICK_COLOUR)[1].trim();
        Socket.getInstance().colourChange(colour);
      } else if (newMessage.startsWith(`${NICK} `)) {
        const name = newMessage.split(NICK)[1].trim();
        Socket.getInstance().nameChange(name);
      } else {
        dispatch(
          addNotificationAction(
            NotificationModel.generateNotification('Invalid command entered.', 'warning'),
          ),
        );
      }
    } else if (message.length > 0) {
      Socket.getInstance().newMessage(message);
    }

    setMessage('');
  }, [dispatch, message]);

  const keyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Enter') {
        submit();
      }
    },
    [submit],
  );

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messageBoxScroll',
      smooth: true,
      duration: 150,
      isDynamic: true,
    });
  }, [messages]);

  useEffect(() => {
    document.addEventListener('keyup', keyPress, false);

    return () => {
      document.removeEventListener('keyup', keyPress, false);
    };
  }, [keyPress]);

  return (
    <div className={classes.chat}>
      <div className={classes.layer} id="messageBoxScroll">
        <div className={classes.messages}>
          {messages.map((message, index) => {
            return <Message key={index} message={message} user={user} />;
          })}
        </div>
      </div>
      <div className={classes.textRow}>
        <div className={classes.textCell}>
          <TextField
            className={classes.textBox}
            placeholder="Type a message..."
            fullWidth={true}
            multiline={true}
            variant="outlined"
            color="secondary"
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
