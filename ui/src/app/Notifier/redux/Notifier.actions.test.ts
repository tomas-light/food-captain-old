import { Notification } from '@Notifier';
import { NotifierActions } from './Notifier.actions';

test('enqueueSnackbar', () => {
	const notification = new Notification('m');

	const action = NotifierActions.enqueueSnackbar(notification);
	expect(action.type).toBe(NotifierActions.ENQUEUE_SNACKBAR);
	expect(action.payload).toEqual(notification);
});

test('removeSnackbar', () => {
	const key = 'my key';

	const action = NotifierActions.removeSnackbar(key);
	expect(action.type).toBe(NotifierActions.REMOVE_SNACKBAR);
	expect(action.payload).toEqual({ key });
});
