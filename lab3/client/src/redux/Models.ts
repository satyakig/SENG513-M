import moment from 'moment-timezone';

moment.tz.setDefault(moment.tz.guess());

type SeverityType = 'success' | 'info' | 'warning' | 'error' | undefined;

export interface User {
  id: string;
  name: string;
  colour: string;
  joinedOn: number;
  lastActive: number;
}

export interface Message {
  id: string;
  message: string;
  timestamp: number;
  byId: string;
  byName: string;
  byColour: string;
}

export interface Notification {
  id: string;
  message: string;
  timestamp: number;
  severity: SeverityType;
}

export interface SendMessage {
  message: string;
  id: string;
}

export interface NameChange {
  newName: string;
  id: string;
}

export interface ColourChange {
  newColour: string;
  id: string;
}

export interface NewConnection {
  id: string;
}

export interface StyleProp {
  isThisUser: boolean;
  colour: string;
}

const ACTIVE_TTL = 15 * 60;
const TYPING_TTL = 10;

export class UserModel {
  id = '';
  name = '';
  colour = '#000000';
  joinedOn = 0;
  lastActive = 0;

  active = false;
  typing = false;
  initials = '';

  constructor(user?: User) {
    if (user) {
      this.id = user.id;
      this.name = user.name;
      this.colour = user.colour;
      this.joinedOn = user.joinedOn;
      this.lastActive = user.lastActive;

      this.active = moment().unix() - this.lastActive <= ACTIVE_TTL;
      this.typing = moment().unix() - this.lastActive <= TYPING_TTL;

      this.initials = this.name
        .split(' ')
        .map((x) => x[0].toUpperCase())
        .join('');
    }
  }

  isSameUser(otherUser: UserModel): boolean {
    return otherUser.id === this.id;
  }
}

export class MessageModel {
  id = '';
  message = '';
  timestamp = 0;
  byId = '';
  byName = '';
  byColour = '#000000';

  byInitials = '';

  constructor(message?: Message) {
    if (message) {
      this.id = message.id;
      this.message = message.message;
      this.timestamp = message.timestamp;
      this.byId = message.byId;
      this.byName = message.byName;
      this.byColour = message.byColour;

      this.byInitials = this.byName
        .split(' ')
        .map((x) => x[0].toUpperCase())
        .join('');
    }
  }

  isSameUser(user: UserModel): boolean {
    return user.id === this.byId;
  }
}

export class NotificationModel {
  id = '';
  message = '';
  timestamp = 0;
  severity: SeverityType = 'info';

  constructor(notification?: Notification) {
    if (notification) {
      this.id = notification.id;
      this.message = notification.message;
      this.timestamp = notification.timestamp;
      this.severity = notification.severity as SeverityType;
    }
  }
}
