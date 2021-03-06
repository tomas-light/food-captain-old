import { History } from 'history';
import { ReducersMapObject } from 'redux';
import { connectRouter } from 'connected-react-router';

import { AppInitterReducer } from '@app/AppInitter/redux';
import { notifierReducer } from '@Notifier';
import { State } from '@State';
import { MenuReducer } from '@app/menu/redux';
import { UserReducer } from '@app/user/redux';
import { DishReducer } from '@app/dish/redux';

export function getReducers(history: History): ReducersMapObject<State, any> {
  return {
    router: connectRouter(history),
    appInitter: AppInitterReducer,
    notifier: notifierReducer,
    menu: MenuReducer,
    user: UserReducer,
    dish: DishReducer,
  };
}
