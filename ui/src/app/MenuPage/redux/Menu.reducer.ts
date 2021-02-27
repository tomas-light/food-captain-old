import { Reducer } from 'app-redux-utils';
import { MenuActions } from './Menu.actions';
import { MenuStore } from './Menu.store';

export const MenuReducer = Reducer(new MenuStore(), MenuActions.UPDATE_STORE);
