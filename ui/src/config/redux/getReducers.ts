import { ReducersMapObject } from 'redux';

import { AppInitterReducer } from '@app/AppInitter/redux';
import { notifierReducer } from '@Notifier';
import { State } from '@State';
import { MenuReducer } from '@app/menu/redux';
import { UserReducer } from '@app/user/redux';
import { DishReducer } from '@app/dish/redux';

export function getReducers(): ReducersMapObject<State, any> {
  return {
    appInitter: AppInitterReducer,
    notifier: notifierReducer,
    menu: MenuReducer,
    user: UserReducer,
    dish: DishReducer,
  };
}
