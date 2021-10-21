import { createAction } from 'app-redux-utils';

import { Notification, NotificationKey } from '../models';

export class NotifierActions {
	static readonly PREFIX = 'NOTIFIER_';

	static readonly ENQUEUE_SNACKBAR = `${NotifierActions.PREFIX}ENQUEUE_SNACKBAR`;
	static readonly REMOVE_SNACKBAR = `${NotifierActions.PREFIX}REMOVE_SNACKBAR`;

	static enqueueSnackbar = (notification: Notification) => createAction(NotifierActions.ENQUEUE_SNACKBAR, notification);

	static removeSnackbar = (key: NotificationKey) => createAction(NotifierActions.REMOVE_SNACKBAR, { key });
}
