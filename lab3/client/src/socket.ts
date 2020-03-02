import io from 'socket.io-client';

export class Socket {
  readonly URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://seng513-labs.appspot.com';

  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io(this.URL);

    this.onConnection();
    this.onMessage();
    this.onDisconnect();
  }

  onConnection() {
    this.socket.on('connect', () => {
      console.log('connected');
      this.socket.emit('message', { message: 'hello' });
    });
  }

  onMessage() {
    this.socket.on('message', (data: any) => {
      console.log(data);
    });
  }

  onDisconnect() {
    this.socket.on('disconnect', (data: any) => {
      console.log(data);
    });
  }

  static setup() {
    new Socket();
  }
}
