import { Action } from 'app-redux-utils';

import { Notification } from '../models';
import { NotifierActions } from './Notifier.actions';
import { NotifierStore } from './Notifier.store';

export const notifierReducer = (
	store: NotifierStore = new NotifierStore(),
	action: Action<Notification>
): NotifierStore => {
	if (!action.payload) {
		return store;
	}

	switch (action.type) {
		case NotifierActions.ENQUEUE_SNACKBAR: {
			if (action.payload.message instanceof Error) {
				action.payload.message = action.payload.message.message;
			} else if (typeof action.payload.message !== 'string') {
				action.payload.message = 'Oops! Something went wrong...';
			}

			return {
				...store,
				notifications: [...store.notifications, action.payload],
			};
		}

		case NotifierActions.REMOVE_SNACKBAR:
			return removeSnackBar(store, action);

		default:
			return store;
	}
};

function removeSnackBar(store: NotifierStore, action: Action<Notification>) {
	const notifications = store.notifications.filter((notification) => notification.key !== action.payload.key);

	return {
		...store,
		notifications,
	};
}
