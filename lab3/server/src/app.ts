import express from 'express';
import { Server } from 'http';
import socketIo from 'socket.io';
import cors from 'cors';
import { ChatRoom, EVENT_TYPES } from './ChatRoom';
import { ColourChange, Connection, NameChange, SendMessage, User } from './Models';
import { sendNotification } from './Helpers';

const app = express();

app.use(cors());

const httpServer = new Server(app);

function setupServer() {
  const io = socketIo(httpServer);

  io.on('connection', (socket) => {
    let user: User;

    socket.on(EVENT_TYPES.NEW_CONNECTION, (data: Connection) => {
      console.debug(data);
      const doesUserExist = ChatRoom.getInstance().getUser(data.id);

      if (doesUserExist) {
        user = doesUserExist;
        sendNotification(
          socket,
          `Welcome back, ${user.name}! You are now connected to the chat room.`,
          'info',
        );
      } else {
        user = ChatRoom.getInstance().addNewUser();
        sendNotification(
          socket,
          `Welcome, ${user.name}! Thank you for joining the chat room.`,
          'success',
        );
      }

      socket.emit(EVENT_TYPES.USER, user);
      socket.emit(EVENT_TYPES.ALL_MESSAGES, ChatRoom.getInstance().getAllMessages());
      socket.emit(EVENT_TYPES.ALL_USERS, ChatRoom.getInstance().getAllUsers());
      socket.broadcast.emit(EVENT_TYPES.ADD_USER, user);
    });

    socket.on(EVENT_TYPES.NEW_MESSAGE, (data: SendMessage) => {
      console.debug(data);

      const resp = ChatRoom.getInstance().addNewMessage(data);

      if (typeof resp === 'string') {
        sendNotification(socket, resp, 'error');
      } else {
        user = ChatRoom.getInstance().getUser(data.id) as User;
        io.emit(EVENT_TYPES.ADD_MESSAGE, resp);
        io.emit(EVENT_TYPES.UPDATE_USERS, [user]);
      }
    });

    socket.on(EVENT_TYPES.NAME_CHANGE, (data: NameChange) => {
      console.debug(data);

      const resp = ChatRoom.getInstance().updateUserName(data);

      if (typeof resp === 'string') {
        sendNotification(socket, resp as string, 'error');
      } else {
        user = ChatRoom.getInstance().getUser(data.id) as User;

        sendNotification(socket, 'Your name has been updated.', 'success');
        socket.emit(EVENT_TYPES.USER, user);
        io.emit(EVENT_TYPES.UPDATE_MESSAGES, resp);
        io.emit(EVENT_TYPES.UPDATE_USERS, [user]);
      }
    });

    socket.on(EVENT_TYPES.COLOUR_CHANGE, (data: ColourChange) => {
      console.debug(data);

      const resp = ChatRoom.getInstance().updateUserColour(data);

      if (typeof resp === 'string') {
        sendNotification(socket, resp as string, 'error');
      } else {
        user = ChatRoom.getInstance().getUser(data.id) as User;

        sendNotification(socket, `Your colour has been updated to ${user.colour}.`, 'success');
        socket.emit(EVENT_TYPES.USER, user);
        io.emit(EVENT_TYPES.UPDATE_MESSAGES, resp);
        io.emit(EVENT_TYPES.UPDATE_USERS, [user]);
      }
    });

    socket.on(EVENT_TYPES.USER_TYPING, (data: Connection) => {
      console.debug(data);

      const isUser = ChatRoom.getInstance().getUser(data.id, true);

      if (isUser) {
        user = isUser;
        io.emit(EVENT_TYPES.UPDATE_USERS, [user]);
      }
    });

    socket.on('disconnect', (reason) => {
      const isUser = ChatRoom.getInstance().setUserActivity(user.id, false);

      if (isUser) {
        user = isUser;
        io.emit(EVENT_TYPES.UPDATE_USERS, [user]);
      }
    });
  });
}

app.get('/reset', (req, res) => {
  ChatRoom.getInstance().reset();
  setupServer();
  return res.send('Done');
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  ChatRoom.getInstance();
  setupServer();
  console.debug(`Server started at http://localhost:${PORT}`);
});
