import { Reducer } from 'app-redux-utils';
import { Notification } from '~app/Notifier/Notification';

export class NotifierStore {
  notifications: Notification[];

  constructor() {
    this.notifications = [];
  }

  static update = 'NOTIFIER_update_store';
  static reducer = Reducer(new NotifierStore(), NotifierStore.update);
}
