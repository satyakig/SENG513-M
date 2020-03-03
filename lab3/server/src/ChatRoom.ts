import moment from 'moment';
import { isColourValid, makeNewUser, randomId } from './Helpers';
import { SendMessage, Message, User, ColourChange, NameChange } from './Models';

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

export class ChatRoom {
  private static instance: ChatRoom;

  private USERS: Map<string, User> = new Map();
  private MESSAGES: Map<string, Message> = new Map();

  addNewUser(): User {
    const newUser = makeNewUser();
    this.USERS.set(newUser.id, newUser);

    return newUser;
  }

  getUser(id: string): User | undefined {
    if (!id) {
      return undefined;
    }

    const user = this.USERS.get(id);

    if (user) {
      user.lastActive = moment().valueOf();
      this.USERS.set(user.id, user);
    }

    return user;
  }

  addNewMessage(data: SendMessage): boolean | string {
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

    return true;
  }

  updateUserName(data: NameChange): boolean | string {
    let name = data.newName.trim().replace(/\s\s+/g, ' ');

    if (name.length < 1) {
      return 'Name must be at least 1 character.';
    }

    if (name.length > 50) {
      return 'Name must be under 50 characters.';
    }

    const user = this.getUser(data.id);
    if (!user) {
      return 'Your account could not be found.';
    }

    user.name = data.newName;
    this.USERS.set(user.id, user);

    const messages = [...this.MESSAGES.values()].filter((message) => {
      return message.byId === user.id;
    });

    for (const message of messages) {
      message.byName = user.name;
      this.MESSAGES.set(message.id, message);
    }

    return true;
  }

  updateUserColour(data: ColourChange): boolean | string {
    const user = this.getUser(data.id);
    if (!user) {
      return 'Your account could not be found.';
    }

    const colour = isColourValid(data.newColour.trim());
    if (colour.length === 0) {
      return 'Invalid colour.';
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

    return true;
  }

  getAllUsers(): User[] {
    return [...this.USERS.values()];
  }

  getAllMessages(): Message[] {
    return [...this.MESSAGES.values()];
  }

  static getInstance(): ChatRoom {
    if (ChatRoom.instance === undefined) {
      ChatRoom.instance = new ChatRoom();
    }

    return ChatRoom.instance;
  }
}
