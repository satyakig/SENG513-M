import io from 'socket.io-client';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import Cookies from 'js-cookie';
import { ReduxState } from './redux/combinedReducer';
import {
  ColourChange,
  Message,
  NameChange,
  NewConnection,
  SendMessage,
  User,
} from './redux/Models';
import {
  addNotificationAction,
  setMessagesAction,
  setUserAction,
  setUsersAction,
} from './redux/Actions';
import { STORE } from './index';

export const EVENT_TYPES = {
  USER: 'USER',
  ALL_USERS: 'ALL_USERS',

  NEW_MESSAGE: 'NEW_MESSAGE',
  ALL_MESSAGES: 'ALL_MESSAGES',

  NAME_CHANGE: 'NAME_CHANGE',
  COLOUR_CHANGE: 'COLOUR_CHANGE',

  NOTIFICATION: 'NOTIFICATION',

  NEW_CONNECTION: 'NEW_CONNECTION',
};

const USER_ID = 'USER_ID';

export class Socket {
  readonly URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://seng513-labs.appspot.com';

  private cookie = Cookies.get(USER_ID);
  private socket: SocketIOClient.Socket;
  private static instance: Socket;

  constructor() {
    this.socket = io(this.URL);

    this.socket.on('connect', () => {
      console.debug('connected to server');

      const data: NewConnection = {
        id: this.cookie ? this.cookie : '',
      };

      this.socket.emit(EVENT_TYPES.NEW_CONNECTION, data);
    });

    this.socket.on(EVENT_TYPES.USER, (data: User) => {
      Cookies.set(USER_ID, data.id);
      this.generateAction(setUserAction(data));
    });

    this.socket.on(EVENT_TYPES.ALL_USERS, (data: User[]) => {
      this.generateAction(setUsersAction(data));
    });

    this.socket.on(EVENT_TYPES.ALL_MESSAGES, (data: Message[]) => {
      this.generateAction(setMessagesAction(data));
    });

    this.socket.on(EVENT_TYPES.NOTIFICATION, (data: Notification) => {
      this.generateAction(addNotificationAction(data));
    });

    this.socket.on('disconnect', () => {
      console.debug('disconnected from server');
    });
  }

  newMessage(data: SendMessage) {
    this.socket.emit(EVENT_TYPES.NEW_MESSAGE, data);
  }

  nameChange(data: NameChange) {
    this.socket.emit(EVENT_TYPES.NAME_CHANGE, data);
  }

  colourChange(data: ColourChange) {
    this.socket.emit(EVENT_TYPES.COLOUR_CHANGE, data);
  }

  generateAction(action: AnyAction): void {
    STORE.dispatch(action);
  }

  static getInstance(): Socket {
    if (Socket.instance === undefined) {
      Socket.instance = new Socket();
    }

    return Socket.instance;
  }
}
