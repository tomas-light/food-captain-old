import { Reducer } from 'app-redux-utils';

import { AppInitterActions } from './AppInitter.actions';
import { AppInitterStore } from './AppInitter.store';

export const AppInitterReducer = Reducer(new AppInitterStore(), AppInitterActions.UPDATE_STORE);
