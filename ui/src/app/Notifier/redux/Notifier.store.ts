import { Notification } from '../models';

export class NotifierStore {
	notifications: Notification[];

	constructor() {
		this.notifications = [];
	}
}
