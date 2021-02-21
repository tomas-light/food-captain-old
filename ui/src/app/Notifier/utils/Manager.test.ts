import { Notification } from '../models';
import { Manager } from './Manager';

test('filterKeys', () => {
  const keys = [
    'k_3',
    'k_1',
    'k_5',
  ];

  Manager['snackbarKeys'] = keys;
  expect(Manager['snackbarKeys'].length).toBe(keys.length);

  Manager.filterKeys(keys[1]);
  expect(Manager['snackbarKeys'].length).toBe(2);
  expect(Manager['snackbarKeys']).toEqual([
    'k_3',
    'k_5',
  ]);
});

describe('addNewNotifications', () => {
  let enqueueIfNeeded: jest.Mock;
  let closeSnackbar: jest.Mock;
  let manager: Manager;

  const mockFn = jest.fn();

  beforeEach(() => {
    Manager['snackbarKeys'] = [];
    enqueueIfNeeded = jest.fn();
    closeSnackbar = jest.fn();

    manager = new Manager(
      mockFn,
      closeSnackbar,
      mockFn
    );
    manager['enqueueIfNeeded'] = enqueueIfNeeded;
  });

  test('add 1', () => {
    expect(Manager['snackbarKeys'].length).toBe(0);

    const notifications: Notification[] = [
      new Notification('mess 1'),
    ];
    manager.addNewNotifications(notifications);

    expect(enqueueIfNeeded).toHaveBeenCalledTimes(notifications.length);
  });

  test('add 3', () => {
    expect(Manager['snackbarKeys'].length).toBe(0);

    const notifications: Notification[] = [
      new Notification('mess 1'),
      new Notification('mess 2'),
      new Notification('mess 3'),
    ];
    manager.addNewNotifications(notifications);

    expect(enqueueIfNeeded).toHaveBeenCalledTimes(notifications.length);
  });

  test('add 3, where 1 is dismissed', () => {
    expect(Manager['snackbarKeys'].length).toBe(0);

    const dismissedNotification = new Notification('mess 2');
    dismissedNotification.dismissed = true;

    const notifications: Notification[] = [
      new Notification('mess 1'),
      dismissedNotification,
      new Notification('mess 3'),
    ];
    manager.addNewNotifications(notifications);

    expect(closeSnackbar).toHaveBeenCalledTimes(1);
    expect(enqueueIfNeeded).toHaveBeenCalledTimes(2);
  });
});

describe('enqueueIfNeeded', () => {
  let enqueueSnackbar: jest.Mock;
  let closeSnackbar: jest.Mock;
  let onExited: jest.Mock;

  beforeEach(() => {
    Manager['snackbarKeys'] = [];
    enqueueSnackbar = jest.fn();
    closeSnackbar = jest.fn();
    onExited = jest.fn();
  });

  test('new key', () => {
    expect(Manager['snackbarKeys'].length).toBe(0);

    const manager = new Manager(
      enqueueSnackbar,
      closeSnackbar,
      onExited
    );
    const notifications: Notification[] = [
      new Notification('mess'),
    ];

    manager['enqueueIfNeeded'](notifications[0]);
    expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
    expect(enqueueSnackbar).toBeCalledWith('mess', { onExited });
    expect(Manager['snackbarKeys'].length).toBe(notifications.length);
  });

  test('duplicate key', () => {
    expect(Manager['snackbarKeys'].length).toBe(0);

    const manager = new Manager(
      enqueueSnackbar,
      closeSnackbar,
      onExited
    );
    const notifications: Notification[] = [
      new Notification('mess'),
    ];

    manager['enqueueIfNeeded'](notifications[0]);
    manager['enqueueIfNeeded'](notifications[0]);
    expect(Manager['snackbarKeys'].length).toBe(notifications.length);
  });
});
