import { Notification } from '@Notifier';
import { ApiResponse } from './ApiResponse';
import { SOMETHING_WRONG_MESSAGE } from './constants';

export function createApiErrorNotification(response: ApiResponse): Notification {
  if (!(response instanceof ApiResponse)) {
    return makeDefaultNotification();
  }

  if (response.hasClientError()) {
    return new Notification(
      response.error,
      { variant: 'warning' }
    );
  }

  if (response.hasServerError()) {
    return new Notification(
      response.error,
      { variant: 'error' }
    );
  }

  return makeDefaultNotification();
}

function makeDefaultNotification() {
  return new Notification(
    SOMETHING_WRONG_MESSAGE,
    { variant: 'default' }
  );
}
