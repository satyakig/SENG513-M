import express from 'express';
import { Server } from 'http';
import socketIo from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(morgan('dev'));

const httpServer = new Server(app);
const io = socketIo(httpServer);

io.on('connection', (socket) => {
  console.log('user connected', socket.request.connection.remoteAddress);

  socket.on('message', (msg: any) => {
    console.debug(msg);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.debug(`Server started at http://localhost:${PORT}`);
});
