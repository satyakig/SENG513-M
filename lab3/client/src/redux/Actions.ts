import { Message, User, Notification } from './Models';

export const ACTION_TYPES = {
  SET_USER: 'SET_USER',

  SET_USERS: 'SET_USERS',
  UPDATE_USERS: 'UPDATE_USERS',
  ADD_USER: 'ADD_USER',

  SET_MESSAGES: 'SET_MESSAGES',
  UPDATE_MESSAGES: 'UPDATE_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',

  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
};

export function setUserAction(user: User) {
  return {
    type: ACTION_TYPES.SET_USER,
    user,
  };
}

export function setUsersAction(users: User[]) {
  return {
    type: ACTION_TYPES.SET_USERS,
    users,
  };
}

export function addUserAction(user: User) {
  return {
    type: ACTION_TYPES.ADD_USER,
    user,
  };
}

export function updateUsersAction(users: User[]) {
  return {
    type: ACTION_TYPES.UPDATE_USERS,
    users,
  };
}

export function setMessagesAction(messages: Message[]) {
  return {
    type: ACTION_TYPES.SET_MESSAGES,
    messages,
  };
}

export function updateMessagesAction(messages: Message[]) {
  return {
    type: ACTION_TYPES.UPDATE_MESSAGES,
    messages,
  };
}

export function addMessageAction(message: Message) {
  return {
    type: ACTION_TYPES.ADD_MESSAGE,
    message,
  };
}

export function addNotificationAction(notification: Notification) {
  return {
    type: ACTION_TYPES.ADD_NOTIFICATION,
    notification,
  };
}

export function removeNotificationAction(notificationId: string) {
  return {
    type: ACTION_TYPES.REMOVE_NOTIFICATION,
    notificationId,
  };
}
