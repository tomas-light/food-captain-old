import {
  createAction,
  watch,
  ControllerBase,
  Action,
  WatchedController
} from 'app-redux-utils';
import { Notification } from '~Notifier/Notification';
import { NotifierStore } from '~Notifier/Notifier.store';
import { State } from '~State';

@watch
class NotifierController extends ControllerBase<State> {
  private updateStore(partialStore: Partial<NotifierStore>) {
    this.dispatch(createAction(NotifierStore.update, partialStore));
  }

  @watch
  notify(action: Action<Notification>) {
    const notification = action.payload;

    const notifications = this.getState().notifier.notifications;
    this.updateStore({
      notifications: notifications.concat(notification),
    });

    setTimeout(() => {
      const notifications = this.getState().notifier.notifications;

      this.updateStore({
        notifications: notifications.filter(_notification => _notification.key !== notification.key),
      });
    }, 1000);
  }
}

const notifierController: WatchedController<NotifierController> = NotifierController as any;
export { notifierController as NotifierController };
