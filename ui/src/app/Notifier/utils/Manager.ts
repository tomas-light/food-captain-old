import { ReactNode, ReactText } from 'react';
import { OptionsObject, SnackbarKey } from 'notistack';

import { Notification } from '../models';

export class Manager {
  private static snackbarKeys: SnackbarKey[] = [];
  private readonly enqueue: (notification: Notification) => void;
  private readonly close: (key?: SnackbarKey) => void;

  constructor(
    enqueueSnackbar: (message: ReactNode, options?: OptionsObject) => ReactText,
    closeSnackbar: (key?: SnackbarKey) => void,
    onExited: (event, key: SnackbarKey) => void
  ) {
    this.enqueue = (notification: Notification) => {
      enqueueSnackbar(notification.message, {
        ...notification.options,
        onExited,
      });
    };
    this.close = closeSnackbar;
  }

  static filterKeys(key: SnackbarKey) {
    Manager.snackbarKeys = Manager.snackbarKeys.filter(_key => _key !== key);
  }

  addNewNotifications(notifications: Notification[]) {
    notifications.forEach(notification => {
      if (notification.dismissed) {
        this.close(notification.key);
        return;
      }

      this.enqueueIfNeeded(notification);
    });
  }

  private enqueueIfNeeded(notification: Notification) {
    if (!Manager.snackbarKeys.includes(notification.key)) {
      this.enqueue(notification);
      Manager.snackbarKeys.push(notification.key);
    }
  }
}
