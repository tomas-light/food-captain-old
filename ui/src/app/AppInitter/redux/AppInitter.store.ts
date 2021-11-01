import { Reducer } from 'app-redux-utils';

export class AppInitterStore {
	initialized: boolean;

	constructor() {
		this.initialized = false;
	}

	static update = 'APP_INITTER_update_store';
	static reducer = Reducer(new AppInitterStore(), AppInitterStore.update);
}
