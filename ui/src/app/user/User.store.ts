import { Reducer } from 'app-redux-utils';
import { User } from '~models';

export class UserStore {
	users: User[];
	currentUser: User;

	constructor() {
		this.users = [];
		this.currentUser = null;
	}

	static update = 'USER_update_store';
	static reducer = Reducer(new UserStore(), UserStore.update);
}
