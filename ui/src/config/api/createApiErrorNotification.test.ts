import { Notification } from '~Notifier/Notification';
import { ApiResponse } from '~utils/api/ApiResponse';
import { ApiResponseStatus } from '~utils/api/ApiResponseStatus';
import { SOMETHING_WRONG_MESSAGE } from '~utils/api/constants';
import { createApiErrorNotification } from './createApiErrorNotification';

function checkDefaultNotification(notification: Notification) {
	expect(notification.message).toBe(SOMETHING_WRONG_MESSAGE);
	expect(notification.variant).toBe('info');
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
	expect(notification.variant).toBe('warning');
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
	expect(notification.variant).toBe('error');
});
