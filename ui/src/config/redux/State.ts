import { RouterState } from 'connected-react-router';

import { AppInitterStore } from '@app/AppInitter/redux';
import { NotifierStore } from '@Notifier';

export interface State {
  router: RouterState;
  appInitter: AppInitterStore;
  notifier: NotifierStore;
}
