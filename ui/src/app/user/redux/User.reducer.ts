import { Reducer } from 'app-redux-utils';
import { UserActions } from './User.actions';
import { UserStore } from './User.store';

export const UserReducer = Reducer(new UserStore(), UserActions.UPDATE_STORE);
