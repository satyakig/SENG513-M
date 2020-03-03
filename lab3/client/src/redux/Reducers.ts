import { Message, MessageModel, NotificationModel, User, UserModel } from './Models';
import { AnyAction } from 'redux';
import { ACTION_TYPES } from './Actions';

export function userReducer(state: UserModel = new UserModel(), action: AnyAction): UserModel {
  if (action.type === ACTION_TYPES.SET_USER) {
    return new UserModel(action.user);
  }

  return state;
}

export function usersReducer(state: UserModel[] = [], action: AnyAction): UserModel[] {
  if (action.type === ACTION_TYPES.SET_USERS) {
    return action.users.map((user: User) => {
      return new UserModel(user);
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
  } else if (action.type === ACTION_TYPES.ADD_MESSAGE) {
    return state
      .concat([new MessageModel(action.message)])
      .sort((a: MessageModel, b: MessageModel) => {
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
    return state.concat([new NotificationModel(action.notification)]);
  } else if (action.type === ACTION_TYPES.REMOVE_NOTIFICATION) {
    return state.filter((notification) => {
      return notification.id !== action.notificationId;
    });
  }

  return state;
}
