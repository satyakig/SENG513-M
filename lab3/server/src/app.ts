import express from 'express';
import { Server } from 'http';
import socketIo from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import { ChatRoom, EVENT_TYPES } from './ChatRoom';
import { ColourChange, NewConnection, NameChange, SendMessage, User } from './Models';
import { sendNotification } from './Helpers';

const app = express();
app.use(cors());
app.use(morgan('dev'));

const httpServer = new Server(app);
const io = socketIo(httpServer);

io.on('connection', (socket) => {
  const instance = ChatRoom.getInstance();
  let user: User;

  socket.on(EVENT_TYPES.NEW_CONNECTION, (data: NewConnection) => {
    console.debug(data);
    const doesUserExist = instance.getUser(data.id);

    if (doesUserExist) {
      user = doesUserExist;
      sendNotification(
        socket,
        `Welcome back, ${user.name}! You are now connected to the chat room.`,
        'info',
      );
    } else {
      user = instance.addNewUser();
      sendNotification(
        socket,
        `Welcome, ${user.name}! Thank you for joining the chat room.`,
        'success',
      );
    }

    socket.emit(EVENT_TYPES.USER, user);
    io.emit(EVENT_TYPES.ALL_MESSAGES, instance.getAllMessages());
    io.emit(EVENT_TYPES.ALL_USERS, instance.getAllUsers());
  });

  socket.on(EVENT_TYPES.NEW_MESSAGE, (data: SendMessage) => {
    console.debug(data);

    const resp = instance.addNewMessage(data);
    if (resp !== true) {
      sendNotification(socket, resp as string, 'error');
    } else {
      user = instance.getUser(data.id) as User;
      io.emit(EVENT_TYPES.ALL_MESSAGES, instance.getAllMessages());
      io.emit(EVENT_TYPES.ALL_USERS, instance.getAllUsers());
    }
  });

  socket.on(EVENT_TYPES.NAME_CHANGE, (data: NameChange) => {
    console.debug(data);

    const resp = instance.updateUserName(data);
    if (resp !== true) {
      sendNotification(socket, resp as string, 'error');
    } else {
      user = instance.getUser(data.id) as User;

      sendNotification(socket, 'Your name has been updated.', 'success');
      socket.emit(EVENT_TYPES.USER, user);
      io.emit(EVENT_TYPES.ALL_USERS, instance.getAllUsers());
      io.emit(EVENT_TYPES.ALL_MESSAGES, instance.getAllMessages());
    }
  });

  socket.on(EVENT_TYPES.COLOUR_CHANGE, (data: ColourChange) => {
    console.debug(data);

    const resp = instance.updateUserColour(data);
    if (resp !== true) {
      sendNotification(socket, resp as string, 'error');
    } else {
      user = instance.getUser(data.id) as User;

      sendNotification(socket, 'Your colour has been updated.', 'success');
      socket.emit(EVENT_TYPES.USER, user);
      io.emit(EVENT_TYPES.ALL_USERS, instance.getAllUsers());
      io.emit(EVENT_TYPES.ALL_MESSAGES, instance.getAllMessages());
    }
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  ChatRoom.getInstance();
  console.debug(`Server started at http://localhost:${PORT}`);
});
