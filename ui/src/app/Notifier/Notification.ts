import { guid } from '~utils';

type NotificationVariant = 'success' | 'info' | 'warning' | 'error';

interface Notification {
	key: string;
	message: string;
	variant?: NotificationVariant;
}

class NotificationImpl implements Notification {
	key: string;
	message: string;
	variant?: NotificationVariant;

	constructor(notification?: Partial<Notification>) {
		this.key = guid();
		this.message = '';
		this.variant = 'info';

		if (notification) {
			Object.assign(this, notification);
		}
	}
}

export type { Notification, NotificationVariant };
export { NotificationImpl };
