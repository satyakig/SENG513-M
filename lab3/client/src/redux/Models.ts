import moment from 'moment-timezone';

moment.tz.setDefault(moment.tz.guess());

const ACTIVE_TTL = 15 * 60;
const TYPING_TTL = 10;

export class UserModel {
  id = '';
  name = '';
  colour = '#000000';
  joinedOn = 0;
  lastTyped = 0;

  active = false;
  typing = false;

  constructor(id = '', name = '', colour = '#000000', joinedOn = 0, lastTyped = 0) {
    this.id = id;
    this.name = name;
    this.colour = colour;
    this.joinedOn = joinedOn;
    this.lastTyped = lastTyped;

    this.active = moment().unix() - this.lastTyped <= ACTIVE_TTL;
    this.typing = moment().unix() - this.lastTyped <= TYPING_TTL;
  }

  isSameUser(otherUser: UserModel): boolean {
    return otherUser.id === this.id;
  }
}

export class MessageModel {
  message = '';
  timestamp = 0;
  byId = '';
  byColour = '#000000';

  constructor(message = '', timestamp = 0, byId = '', colour = '#000000') {
    this.message = message;
    this.timestamp = timestamp;
    this.byId = byId;
    this.byColour = colour;
  }

  isSameUser(user: UserModel): boolean {
    return user.id === this.byId;
  }
}

type SeverityType = 'success' | 'info' | 'warning' | 'error' | undefined;

export class NotificationModel {
  id = '';
  message = '';
  timestamp = 0;
  severity: SeverityType = 'info';

  constructor(id = '', message = '', timestamp = 0, severity = 'info') {
    this.id = id;
    this.message = message;
    this.timestamp = timestamp;
    this.severity = severity as SeverityType;
  }
}
