import { AbstractStore, ControllerBase as UtilsControllerBase } from 'app-redux-utils';
import { Notification, NotificationImpl } from '~Notifier/Notification';
import { NotifierController } from '~Notifier/Notifier.controller';
import { State } from '~State';
import { HistoryProvider } from '~utils/HistoryProvider';
import { metadata } from '~utils/metadata';

@metadata
export abstract class ControllerBase extends UtilsControllerBase<State> {
	constructor(reduxStore: AbstractStore<State>, protected readonly historyProvider: HistoryProvider) {
		super(reduxStore);
		if (new.target === ControllerBase) {
			throw new Error('Cannot construct ControllerBase instance directly');
		}
	}

	protected notify(notification: Omit<Notification, 'key'>) {
		this.dispatch(NotifierController.notify(new NotificationImpl(notification)));
	}

	protected redirect(appUrl: string) {
		this.historyProvider.get().push(appUrl);
	}
}
