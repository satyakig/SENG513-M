export const ACTION_TYPES = {
  SET_USER: 'SET_USER',

  SET_USERS: 'SET_USERS',

  SET_MESSAGES: 'SET_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',

  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
};

export function setUserAction(user: any) {
  return {
    type: ACTION_TYPES.SET_USER,
    user,
  };
}

export function setUsersAction(users: any[]) {
  return {
    type: ACTION_TYPES.SET_USERS,
    users,
  };
}

export function setMessagesAction(messages: any[]) {
  return {
    type: ACTION_TYPES.SET_MESSAGES,
    messages,
  };
}

export function addMessageAction(message: any) {
  return {
    type: ACTION_TYPES.ADD_MESSAGE,
    message,
  };
}

export function addNotificationAction(notification: any) {
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
