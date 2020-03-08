import moment from 'moment';
import { isColourValid, randomColour, randomId, randomName } from './Helpers';
import { SendMessage, Message, User, ColourChange, NameChange } from './Models';

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

export class ChatRoom {
  private static instance: ChatRoom;

  private USERS: Map<string, User> = new Map();
  private MESSAGES: Map<string, Message> = new Map();

  addNewUser(): User {
    const now = moment().valueOf();

    const names = [...this.USERS.values()].map((user) => {
      return user.name;
    });

    let name = randomName();
    while (names.includes(name)) {
      name = randomName();
    }

    const newUser: User = {
      id: randomId(),
      name,
      colour: randomColour(),
      joinedOn: now,
      lastActive: now,
      active: true,
      typing: false,
    };

    this.USERS.set(newUser.id, newUser);

    return newUser;
  }

  getUser(id: string, typing: boolean = false): User | undefined {
    if (!id) {
      return undefined;
    }

    const user = this.USERS.get(id);

    if (user) {
      const now = moment().valueOf();
      user.active = true;
      user.lastActive = now;
      user.typing = typing;

      this.USERS.set(user.id, user);
    }

    return user;
  }

  setUserActivity(id: string, active: boolean): User | undefined {
    const user = this.getUser(id);

    if (user) {
      user.active = active;
      this.USERS.set(user.id, user);
    }

    return user;
  }

  addNewMessage(data: SendMessage): Message | string {
    const user = this.getUser(data.id);

    if (!user) {
      return 'Your account could not be found.';
    }

    const newMessage: Message = {
      id: randomId(),
      message: data.message,
      timestamp: moment().valueOf(),
      byColour: user.colour,
      byId: user.id,
      byName: user.name,
    };

    this.MESSAGES.set(newMessage.id, newMessage);

    return newMessage;
  }

  updateUserName(data: NameChange): Message[] | string {
    let name = data.newName.trim().replace(/\s\s+/g, ' ');

    if (name.length < 1) {
      return 'Name must be at least 1 character.';
    }

    if (name.length > 15) {
      return 'Name must be under 15 characters.';
    }

    const user = this.getUser(data.id);
    if (!user) {
      return 'Your account could not be found.';
    }

    const names = [...this.USERS.values()].map((user) => {
      return user.name;
    });

    if (names.includes(name)) {
      return 'A user already exists with this name. Please choose another one.';
    }

    user.name = name;
    this.USERS.set(user.id, user);

    const messages = [...this.MESSAGES.values()].filter((message) => {
      return message.byId === user.id;
    });

    for (const message of messages) {
      message.byName = user.name;
      this.MESSAGES.set(message.id, message);
    }

    return messages;
  }

  updateUserColour(data: ColourChange): Message[] | string {
    let colour = data.newColour.trim();

    if (colour.length < 1) {
      return 'Colour must be at least 1 character.';
    }

    const user = this.getUser(data.id);
    if (!user) {
      return 'Your account could not be found.';
    }

    colour = isColourValid(colour);
    if (colour.length === 0) {
      return 'You entered an invalid colour.';
    } else if (colour === '#FFFFFF') {
      return 'You cannot use the colour white.';
    }

    user.colour = colour;
    this.USERS.set(user.id, user);

    const messages = [...this.MESSAGES.values()].filter((message) => {
      return message.byId === user.id;
    });

    for (const message of messages) {
      message.byColour = user.colour;
      this.MESSAGES.set(message.id, message);
    }

    return messages;
  }

  getAllUsers(): User[] {
    return [...this.USERS.values()];
  }

  getAllMessages(): Message[] {
    return [...this.MESSAGES.values()];
  }

  reset(): void {
    ChatRoom.instance = new ChatRoom();
  }

  static getInstance(): ChatRoom {
    if (ChatRoom.instance === undefined) {
      ChatRoom.instance = new ChatRoom();
    }

    return ChatRoom.instance;
  }
}
