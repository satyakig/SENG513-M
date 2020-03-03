export type SeverityType = 'success' | 'info' | 'warning' | 'error' | undefined;

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
