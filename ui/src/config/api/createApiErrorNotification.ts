import { ApiResponse, SOMETHING_WRONG_MESSAGE } from '~utils/api';
import { NotificationImpl, Notification } from '~Notifier/Notification';

export function createApiErrorNotification(response: ApiResponse): Notification {
  if (!(response instanceof ApiResponse)) {
    return new NotificationImpl({ message: SOMETHING_WRONG_MESSAGE, variant: 'info' });
  }

  if (response.hasClientError()) {
    return new NotificationImpl({ message: response.error, variant: 'warning' });
  }

  if (response.hasServerError()) {
    return new NotificationImpl({ message: response.error, variant: 'error' });
  }

  return new NotificationImpl({ message: SOMETHING_WRONG_MESSAGE, variant: 'info' });
}
