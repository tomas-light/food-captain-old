import { useCallback, useEffect } from 'react';
import { SnackbarKey, useSnackbar } from 'notistack';

import { Notification } from '../models';
import { Manager } from './Manager';

function useNotifications(
  notifications: Notification[],
  removeSnackbar: (key: SnackbarKey) => void
) {
  const {
    enqueueSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const onExited = useCallback((event, key: SnackbarKey) => {
    removeSnackbar(key);
    Manager.filterKeys(key);
  }, [removeSnackbar]);

  useEffect(() => {
    const manager = new Manager(
      enqueueSnackbar,
      closeSnackbar,
      onExited,
    );
    manager.addNewNotifications(notifications);
  }, [notifications]);
}

export { useNotifications };
