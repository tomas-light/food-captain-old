import { ReactNode } from 'react';
import { OptionsObject, SnackbarKey } from 'notistack';
import { guid } from '@utils';

export class Notification {
	key: string;
	message: string | ReactNode;
	options: OptionsObject;
	dismissed: boolean;

	constructor(messageOrApiResponse: string | Error, options: OptionsObject = {}) {
		this.key = guid();
		this.options = options;
		this.dismissed = false;

		if (messageOrApiResponse instanceof Error) {
			this.message = messageOrApiResponse.message;
			this.options.variant = 'error';
		} else {
			this.message = messageOrApiResponse;
		}
	}
}

export type { SnackbarKey as NotificationKey };
