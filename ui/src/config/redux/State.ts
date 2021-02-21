import { RouterState } from 'connected-react-router';

import { AppInitterStore } from '@app/AppInitter/redux';
import { NotifierStore } from '@Notifier';

export interface State {
  appInitter: AppInitterStore;
  router: RouterState;
  notifier: NotifierStore;
}
