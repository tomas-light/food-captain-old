import { Notification } from '@Notifier';
import { ApiResponse } from './ApiResponse';
import { ApiResponseStatus } from './ApiResponseStatus';
import { SOMETHING_WRONG_MESSAGE } from './constants';
import { createApiErrorNotification } from './createApiErrorNotification';

function checkDefaultNotification(notification: Notification) {
  expect(notification.message).toBe(SOMETHING_WRONG_MESSAGE);
  expect(notification.options.variant).toBe('default');
}

test('no response', () => {
  const notification = createApiErrorNotification(null as any);
  checkDefaultNotification(notification);
});

test('has timeout error', () => {
  const message = 'some error message 1';
  const notification = createApiErrorNotification(
    new ApiResponse({
      statusCode: ApiResponseStatus.RequestTimeout,
      error: message,
    })
  );
  checkDefaultNotification(notification);
});

test('300 status', () => {
  const message = 'some error message 2';
  const notification = createApiErrorNotification(
    new ApiResponse({
      statusCode: 300,
      error: message,
    })
  );
  checkDefaultNotification(notification);
});

test('200 status', () => {
  const message = 'some error message 3';
  const notification = createApiErrorNotification(
    new ApiResponse({
      statusCode: ApiResponseStatus.Ok,
      error: message,
    })
  );
  checkDefaultNotification(notification);
});

test('has client error', () => {
  const message = 'some error message 4';
  const notification = createApiErrorNotification(
    new ApiResponse({
      statusCode: ApiResponseStatus.BadRequest,
      error: message,
    })
  );
  expect(notification.message).toBe(message);
  expect(notification.options.variant).toBe('warning');
});

test('has server error', () => {
  const message = 'some error message 5';
  const notification = createApiErrorNotification(
    new ApiResponse({
      statusCode: ApiResponseStatus.InternalServerError,
      error: message,
    })
  );
  expect(notification.message).toBe(message);
  expect(notification.options.variant).toBe('error');
});
