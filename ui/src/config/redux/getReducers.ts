import { History } from 'history';
import { ReducersMapObject } from 'redux';
import { connectRouter } from 'connected-react-router';

import { AppInitterReducer } from '@app/AppInitter/redux';
import { MenuReducer } from '@app/MenuPage/redux';
import { notifierReducer } from '@Notifier';
import { State } from '@State';

export function getReducers(history: History): ReducersMapObject<State, any> {
  return {
    router: connectRouter(history),
    appInitter: AppInitterReducer,
    notifier: notifierReducer,
    menu: MenuReducer,
  };
}
