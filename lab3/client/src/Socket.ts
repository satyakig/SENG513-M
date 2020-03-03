import io from 'socket.io-client';
import { AnyAction } from 'redux';
import Cookies from 'js-cookie';
import {
  ColourChange,
  Message,
  NameChange,
  Connection,
  SendMessage,
  User,
  Notification,
  UserModel,
} from './redux/Models';
import {
  addMessageAction,
  addNotificationAction,
  addUserAction,
  setMessagesAction,
  setUserAction,
  setUsersAction,
  updateMessagesAction,
  updateUsersAction,
} from './redux/Actions';
import { STORE } from './index';

export const EVENT_TYPES = {
  USER: 'USER',
  ALL_USERS: 'ALL_USERS',
  UPDATE_USERS: 'UPDATE_USERS',
  ADD_USER: 'ADD_USER',

  ALL_MESSAGES: 'ALL_MESSAGES',
  UPDATE_MESSAGES: 'UPDATE_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',

  NOTIFICATION: 'NOTIFICATION',

  NEW_CONNECTION: 'NEW_CONNECTION',
  NEW_MESSAGE: 'NEW_MESSAGE',
  NAME_CHANGE: 'NAME_CHANGE',
  COLOUR_CHANGE: 'COLOUR_CHANGE',
  USER_TYPING: 'USER_TYPING',
};

const USER_ID = 'USER_ID';

export class Socket {
  readonly URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://seng513-labs.appspot.com';

  private cookie = Cookies.get(USER_ID);
  private socket: SocketIOClient.Socket;
  private user: UserModel = new UserModel();
  private static instance: Socket;

  constructor() {
    this.socket = io(this.URL);

    this.socket.on('connect', () => {
      console.debug('connected to server');

      const data: Connection = {
        id: this.cookie ? this.cookie : '',
      };

      this.socket.emit(EVENT_TYPES.NEW_CONNECTION, data);
    });

    this.socket.on(EVENT_TYPES.USER, (data: User) => {
      Cookies.set(USER_ID, data.id);
      this.user = new UserModel(data);
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

    this.socket.on(EVENT_TYPES.UPDATE_USERS, (data: User[]) => {
      this.generateAction(updateUsersAction(data));
    });

    this.socket.on(EVENT_TYPES.UPDATE_MESSAGES, (data: Message[]) => {
      this.generateAction(updateMessagesAction(data));
    });

    this.socket.on(EVENT_TYPES.ADD_USER, (data: User) => {
      this.generateAction(addUserAction(data));
    });

    this.socket.on(EVENT_TYPES.ADD_MESSAGE, (data: Message) => {
      this.generateAction(addMessageAction(data));
    });

    this.socket.on('disconnect', () => {
      console.debug('disconnected from server');
    });
  }

  newMessage(message: string) {
    const data: SendMessage = {
      id: this.user.id,
      message,
    };

    this.socket.emit(EVENT_TYPES.NEW_MESSAGE, data);
  }

  nameChange(name: string) {
    const data: NameChange = {
      id: this.user.id,
      newName: name,
    };

    this.socket.emit(EVENT_TYPES.NAME_CHANGE, data);
  }

  colourChange(colour: string) {
    const data: ColourChange = {
      id: this.user.id,
      newColour: colour,
    };

    this.socket.emit(EVENT_TYPES.COLOUR_CHANGE, data);
  }

  typing() {
    const data: Connection = {
      id: this.user.id,
    };

    this.socket.emit(EVENT_TYPES.USER_TYPING, data);
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
