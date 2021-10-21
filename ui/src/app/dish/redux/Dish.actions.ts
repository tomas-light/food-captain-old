import { createAction } from 'app-redux-utils';

import { DishStore } from './Dish.store';

export class DishActions {
	static PREFIX = 'DISH_';

	static UPDATE_STORE = `${DishActions.PREFIX}UPDATE_STORE`;
	static LOAD_DISHES = `${DishActions.PREFIX}LOAD_DISHES`;

	static updateStore = (partialStore: Partial<DishStore>) => createAction(DishActions.UPDATE_STORE, partialStore);

	static loadDishes = () => createAction(DishActions.LOAD_DISHES);
}
