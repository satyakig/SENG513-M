import express from 'express';
import { Server } from 'http';
import socketIo from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import { ChatRoom, EVENT_TYPES } from './ChatRoom';
import { ColourChange, Connection, NameChange, SendMessage, User } from './Models';
import { sendNotification } from './Helpers';

const app = express();
app.use(cors());
app.use(morgan('dev'));

const httpServer = new Server(app);
const io = socketIo(httpServer);

io.on('connection', (socket) => {
  const instance = ChatRoom.getInstance();
  let user: User;

  socket.on(EVENT_TYPES.NEW_CONNECTION, (data: Connection) => {
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
    socket.emit(EVENT_TYPES.ALL_MESSAGES, instance.getAllMessages());
    socket.emit(EVENT_TYPES.ALL_USERS, instance.getAllUsers());
    socket.broadcast.emit(EVENT_TYPES.ADD_USER, user);
  });

  socket.on(EVENT_TYPES.NEW_MESSAGE, (data: SendMessage) => {
    console.debug(data);

    const resp = instance.addNewMessage(data);

    if (typeof resp === 'string') {
      sendNotification(socket, resp, 'error');
    } else {
      user = instance.getUser(data.id) as User;
      io.emit(EVENT_TYPES.ADD_MESSAGE, resp);
      io.emit(EVENT_TYPES.UPDATE_USERS, [user]);
    }
  });

  socket.on(EVENT_TYPES.NAME_CHANGE, (data: NameChange) => {
    console.debug(data);

    const resp = instance.updateUserName(data);

    if (typeof resp === 'string') {
      sendNotification(socket, resp as string, 'error');
    } else {
      user = instance.getUser(data.id) as User;

      sendNotification(socket, 'Your name has been updated.', 'success');
      socket.emit(EVENT_TYPES.USER, user);
      io.emit(EVENT_TYPES.UPDATE_MESSAGES, resp);
      socket.broadcast.emit(EVENT_TYPES.UPDATE_USERS, [user]);
    }
  });

  socket.on(EVENT_TYPES.COLOUR_CHANGE, (data: ColourChange) => {
    console.debug(data);

    const resp = instance.updateUserColour(data);

    if (typeof resp === 'string') {
      sendNotification(socket, resp as string, 'error');
    } else {
      user = instance.getUser(data.id) as User;

      sendNotification(socket, `Your colour has been updated to ${user.colour}.`, 'success');
      socket.emit(EVENT_TYPES.USER, user);
      io.emit(EVENT_TYPES.UPDATE_MESSAGES, resp);
      socket.broadcast.emit(EVENT_TYPES.UPDATE_USERS, [user]);
    }
  });

  socket.on(EVENT_TYPES.USER_TYPING, (data: Connection) => {
    console.debug(data);

    const isUser = instance.getUser(data.id, true);

    if (isUser) {
      user = isUser;
      io.emit(EVENT_TYPES.UPDATE_USERS, [user]);
    }
  });

  socket.on('disconnect', (reason) => {
    const isUser = instance.setUserActivity(user.id, false);

    if (isUser) {
      user = isUser;
      io.emit(EVENT_TYPES.UPDATE_USERS, [user]);
    }
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  ChatRoom.getInstance();
  console.debug(`Server started at http://localhost:${PORT}`);
});
