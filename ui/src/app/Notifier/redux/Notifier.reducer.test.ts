import { AppAction } from 'app-redux-utils/dist/types/AppAction';

import { Notification, NotifierActions, NotifierStore } from '@Notifier';
import { notifierReducer } from './Notifier.reducer';

describe('ENQUEUE_SNACKBAR', () => {
	let store: NotifierStore;

	beforeEach(() => {
		store = new NotifierStore();
		store.notifications = [
			{
				key: 'key_1',
				message: 'message 1',
				dismissed: false,
				options: {
					variant: 'warning',
				},
			},
			{
				key: 'key_2',
				message: 'message 2',
				dismissed: false,
				options: {
					variant: 'info',
				},
			},
		];
	});

	test('error instance', () => {
		const action = new AppAction<Notification>(NotifierActions.ENQUEUE_SNACKBAR, {
			key: 'key_007',
			message: new Error('some error message'),
			dismissed: false,
			options: {
				variant: 'warning',
			},
		});
		store = notifierReducer(store, action);

		expect(store.notifications).toEqual([
			{
				key: 'key_1',
				message: 'message 1',
				dismissed: false,
				options: {
					variant: 'warning',
				},
			},
			{
				key: 'key_2',
				message: 'message 2',
				dismissed: false,
				options: {
					variant: 'info',
				},
			},
			{
				key: 'key_007',
				message: 'some error message',
				dismissed: false,
				options: {
					variant: 'warning',
				},
			},
		]);
	});

	test('broken message', () => {
		const action = new AppAction<Notification>(NotifierActions.ENQUEUE_SNACKBAR, {
			key: 'key_007',
			message: {},
			dismissed: false,
			options: {
				variant: 'warning',
			},
		});
		store = notifierReducer(store, action);

		expect(store.notifications).toEqual([
			{
				key: 'key_1',
				message: 'message 1',
				dismissed: false,
				options: {
					variant: 'warning',
				},
			},
			{
				key: 'key_2',
				message: 'message 2',
				dismissed: false,
				options: {
					variant: 'info',
				},
			},
			{
				key: 'key_007',
				message: 'Oops! Something went wrong...',
				dismissed: false,
				options: {
					variant: 'warning',
				},
			},
		]);
	});

	test('normal message', () => {
		const action = new AppAction<Notification>(NotifierActions.ENQUEUE_SNACKBAR, {
			key: 'key_007',
			message: 'my message',
			dismissed: false,
			options: {
				variant: 'warning',
			},
		});
		store = notifierReducer(store, action);

		expect(store.notifications).toEqual([
			{
				key: 'key_1',
				message: 'message 1',
				dismissed: false,
				options: {
					variant: 'warning',
				},
			},
			{
				key: 'key_2',
				message: 'message 2',
				dismissed: false,
				options: {
					variant: 'info',
				},
			},
			{
				key: 'key_007',
				message: 'my message',
				dismissed: false,
				options: {
					variant: 'warning',
				},
			},
		]);
	});
});

test('REMOVE_SNACKBAR', () => {
	let store = new NotifierStore();
	store.notifications = [
		{
			key: 'key_1',
			message: 'message 1',
			dismissed: false,
			options: {
				variant: 'warning',
			},
		},
		{
			key: 'key_2',
			message: 'message 2',
			dismissed: false,
			options: {
				variant: 'info',
			},
		},
	];

	const action = new AppAction<Notification>(NotifierActions.REMOVE_SNACKBAR, {
		key: 'key_1',
		message: '',
		dismissed: false,
		options: {},
	});
	store = notifierReducer(store, action);

	expect(store.notifications).toEqual([
		{
			key: 'key_2',
			message: 'message 2',
			dismissed: false,
			options: {
				variant: 'info',
			},
		},
	]);
});

describe('other action', () => {
	test('no payload', () => {
		const store = new NotifierStore();

		const action = new AppAction<any>('some');
		const updatedStore = notifierReducer(store, action);

		expect(store).toBe(updatedStore);
	});

	test('unregistered action type', () => {
		const store = new NotifierStore();

		const action = new AppAction<any>('some', {});
		const updatedStore = notifierReducer(store, action);

		expect(store).toBe(updatedStore);
	});
});
