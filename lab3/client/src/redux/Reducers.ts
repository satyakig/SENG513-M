import { AnyAction } from 'redux';
import { Message, MessageModel, NotificationModel, User, UserModel } from './Models';
import { ACTION_TYPES } from './Actions';

export function userReducer(state: UserModel = new UserModel(), action: AnyAction): UserModel {
  if (action.type === ACTION_TYPES.SET_USER) {
    return new UserModel(action.user);
  }

  return state;
}

export function usersReducer(state: UserModel[] = [], action: AnyAction): UserModel[] {
  if (action.type === ACTION_TYPES.SET_USERS) {
    return action.users
      .map((user: User) => {
        return new UserModel(user);
      })
      .sort((a: UserModel, b: UserModel) => {
        return a.name.localeCompare(b.name);
      });
  } else if (action.type === ACTION_TYPES.UPDATE_USERS) {
    const updatedUsers = action.users.map((user: User) => {
      return new UserModel(user);
    });

    return state
      .map((stateUser: UserModel) => {
        const findUser = updatedUsers.find((updatedUser: UserModel) => {
          return updatedUser.id === stateUser.id;
        });

        if (findUser) {
          return findUser;
        }

        return stateUser;
      })
      .sort((a: UserModel, b: UserModel) => {
        return a.name.localeCompare(b.name);
      });
  } else if (action.type === ACTION_TYPES.ADD_USER) {
    const newUser = new UserModel(action.user);

    const findUserIndex = state.findIndex((user: UserModel) => {
      return user.id === newUser.id;
    });

    if (findUserIndex > -1) {
      state.splice(findUserIndex, 1, newUser);
    } else {
      state.push(newUser);
    }

    return [...state].sort((a: UserModel, b: UserModel) => {
      return a.name.localeCompare(b.name);
    });
  }

  return state;
}

export function messagesReducer(state: MessageModel[] = [], action: AnyAction): MessageModel[] {
  if (action.type === ACTION_TYPES.SET_MESSAGES) {
    return action.messages
      .map((message: Message) => {
        return new MessageModel(message);
      })
      .sort((a: MessageModel, b: MessageModel) => {
        return b.timestamp - a.timestamp;
      });
  } else if (action.type === ACTION_TYPES.UPDATE_MESSAGES) {
    const updatedMessages = action.messages.map((message: Message) => {
      return new MessageModel(message);
    });

    return state
      .map((stateMessage: MessageModel) => {
        const findMessage = updatedMessages.find((updateMessage: MessageModel) => {
          return updateMessage.id === stateMessage.id;
        });

        if (findMessage) {
          return findMessage;
        }

        return stateMessage;
      })
      .sort((a: MessageModel, b: MessageModel) => {
        return b.timestamp - a.timestamp;
      });
  } else if (action.type === ACTION_TYPES.ADD_MESSAGE) {
    const newMessage = new MessageModel(action.message);

    const findMessageIndex = state.findIndex((message: MessageModel) => {
      return message.id === newMessage.id;
    });

    if (findMessageIndex > -1) {
      state.splice(findMessageIndex, 1, newMessage);
    } else {
      state.push(newMessage);
    }

    return [...state].sort((a: MessageModel, b: MessageModel) => {
      return b.timestamp - a.timestamp;
    });
  }

  return state;
}

export function notificationReducer(
  state: NotificationModel[] = [],
  action: AnyAction,
): NotificationModel[] {
  if (action.type === ACTION_TYPES.ADD_NOTIFICATION) {
    return state
      .concat([new NotificationModel(action.notification)])
      .sort((a: NotificationModel, b: NotificationModel) => {
        return a.timestamp - b.timestamp;
      });
  } else if (action.type === ACTION_TYPES.REMOVE_NOTIFICATION) {
    return state
      .filter((notification) => {
        return notification.id !== action.notificationId;
      })
      .sort((a: NotificationModel, b: NotificationModel) => {
        return a.timestamp - b.timestamp;
      });
  }

  return state;
}
