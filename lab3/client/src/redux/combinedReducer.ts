import { combineReducers } from 'redux';
import { MessageModel, NotificationModel, UserModel } from './Models';
import { messagesReducer, notificationReducer, userReducer, usersReducer } from './Reducers';

export interface ReduxState {
  currentUser: UserModel;
  users: UserModel[];
  messages: MessageModel[];
  notifications: NotificationModel[];
}

const combinedReducer = combineReducers({
  currentUser: userReducer,
  users: usersReducer,
  messages: messagesReducer,
  notifications: notificationReducer,
});

export default combinedReducer;
