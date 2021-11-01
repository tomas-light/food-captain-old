import { Reducer } from 'app-redux-utils';
import { Dish } from '~models';

export class DishStore {
	dishes: Dish[];

	constructor() {
		this.dishes = [];
	}

	static update = 'DISH_update_store';
	static reducer = Reducer(new DishStore(), DishStore.update);
}
