import { ControllerBase as UtilsControllerBase, AbstractStore } from 'app-redux-utils';
import { OptionsObject } from 'notistack';

import { Notification, NotifierActions } from '@Notifier';
import { State } from '@State';
import { HistoryProvider, metadata } from '@utils';

@metadata
export abstract class ControllerBase extends UtilsControllerBase<State> {
	constructor(reduxStore: AbstractStore<State>, protected readonly historyProvider: HistoryProvider) {
		super(reduxStore);
		if (new.target === ControllerBase) {
			throw new Error('Cannot construct ControllerBase instance directly');
		}
	}

	protected notify(message: string, options?: OptionsObject) {
		const notification = new Notification(message, options);
		this.dispatch(NotifierActions.enqueueSnackbar(notification));
	}

	protected redirect(appUrl: string) {
		this.historyProvider.get().push(appUrl);
	}
}
