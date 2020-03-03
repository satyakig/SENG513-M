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
import { SeverityType, Notification } from './Models';
import { EVENT_TYPES } from './ChatRoom';

const nameConfig: Config = {
  dictionaries: [adjectives, animals, names, starWars],
  separator: ' ',
  length: 2,
  style: 'capital',
};

export function randomColour(): string {
  let colour = colourString.get(`#${Math.floor(Math.random() * 16777215).toString(16)}`);

  while (colour === null || colour === undefined) {
    colour = colourString.get(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }

  return colourString.to.rgb(colour.value);
}

export function randomName(): string {
  return uniqueNamesGenerator(nameConfig);
}

export function randomId(): string {
  return v4();
}

export function isColourValid(inp: string): string {
  let incColour = inp;

  if (!colourString.get(incColour)) {
    incColour = `#${incColour}`;
  }

  const newColour = colourString.get(incColour);
  if (newColour !== null && newColour !== undefined) {
    return colourString.to.rgb(newColour.value);
  }

  return '';
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
