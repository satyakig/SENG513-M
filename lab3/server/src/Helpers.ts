import {
  adjectives,
  animals,
  Config,
  names,
  starWars,
  uniqueNamesGenerator,
} from 'unique-names-generator';
import { v4 } from 'uuid';
import colourString from 'color-string';
import moment from 'moment';
import { Socket } from 'socket.io';
import { SeverityType, User, Notification } from './Models';
import { EVENT_TYPES } from './ChatRoom';

const nameConfig: Config = {
  dictionaries: [adjectives, animals, names, starWars],
  separator: ' ',
  length: 2,
  style: 'capital',
};

export function randomColour(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export function randomName(): string {
  return uniqueNamesGenerator(nameConfig);
}

export function randomId(): string {
  return v4();
}

export function isColourValid(inp: string): string {
  const colour = colourString.get(inp);

  if (colour !== null && colour !== undefined) {
    return colourString.to.hex(colour.value);
  }

  return '';
}

export function makeNewUser(): User {
  return {
    id: randomId(),
    name: randomName(),
    colour: randomColour(),
    joinedOn: moment().valueOf(),
    lastActive: moment().valueOf(),
  };
}

export function sendNotification(socket: Socket, message: string, severity: SeverityType) {
  const notification: Notification = {
    id: randomId(),
    message,
    timestamp: moment().valueOf(),
    severity,
  };

  socket.emit(EVENT_TYPES.NOTIFICATION, notification);
}
