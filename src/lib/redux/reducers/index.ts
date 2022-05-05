import { combineReducers } from 'redux';
import Shared from './shared';
import User from "./user"
import Theme from "./theme"


export const rootReducer = combineReducers({
  Shared,
  User,
  Theme,
});

