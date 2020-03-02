import { MessageModel, NotificationModel, UserModel } from './Models';
import { AnyAction } from 'redux';
import { ACTION_TYPES } from './Actions';

export function userReducer(state: UserModel = new UserModel(), action: AnyAction): UserModel {
  if (action.type === ACTION_TYPES.SET_USER) {
    const user = action.user;
    return new UserModel(user.id, user.name, user.colour, user.joinedOn, user.lastTyped);
  }

  return state;
}

export function usersReducer(state: UserModel[] = [], action: AnyAction): UserModel[] {
  if (action.type === ACTION_TYPES.SET_USERS) {
    return action.users.map((user: any) => {
      return new UserModel(user.id, user.name, user.colour, user.joinedOn, user.lastType);
    });
  }

  return state;
}

export function messagesReducer(state: MessageModel[] = [], action: AnyAction): MessageModel[] {
  if (action.type === ACTION_TYPES.SET_MESSAGES) {
    return action.messages.map((message: any) => {
      return new MessageModel(message.message, message.timestamp, message.byId, message.byColour);
    });
  } else if (action.type === ACTION_TYPES.ADD_MESSAGE) {
    const msg = action.message;
    return state.concat([new MessageModel(msg.message, msg.timestamp, msg.byId, msg.byColour)]);
  }

  return state;
}

export function notificationReducer(
  state: NotificationModel[] = [],
  action: AnyAction,
): NotificationModel[] {
  if (action.type === ACTION_TYPES.ADD_NOTIFICATION) {
    const ntf = action.notification;
    return state.concat([new NotificationModel(ntf.id, ntf.message, ntf.timestamp, ntf.severity)]);
  } else if (action.type === ACTION_TYPES.REMOVE_NOTIFICATION) {
    const id = action.notificationId;
    return state.filter((notification) => {
      return notification.id !== id;
    });
  }

  return state;
}
