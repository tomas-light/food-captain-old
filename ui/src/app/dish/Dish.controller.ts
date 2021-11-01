import { Action, createAction, DecoratedWatchedController, watch } from 'app-redux-utils';
import { DishApi } from '~api';
import { Dish } from '~models';
import { ControllerBase } from '~app/ControllerBase';
import { DishStore } from './Dish.store';

@watch
class DishController extends ControllerBase {
	private updateStore(partialStore: Partial<DishStore>) {
		this.dispatch(createAction(DishStore.update, partialStore));
	}

	@watch
	async loadDishes() {
		const response = await DishApi.getAllAsync();
		if (response.hasError()) {
			this.updateStore({
				dishes: [],
			});

			return;
		}

		this.updateStore({
			dishes: response.data,
		});
	}

	@watch
	async loadDish(action: Action<string>) {
		const response = await DishApi.getAsync(action.payload);
		if (response.hasError()) {
			return;
		}

		const { dishes } = this.getState().dish;

		this.updateStore({
			dishes: dishes.filter((dish) => dish.id !== action.payload).concat(response.data),
		});
	}

	@watch
	async addDish(action: Action<Dish>) {
		const response = await DishApi.addAsync(action.payload);
		if (response.hasError()) {
			return;
		}

		const { dishes } = this.getState().dish;

		this.updateStore({
			dishes: dishes.concat(response.data),
		});
	}

	@watch
	async updateDish(action: Action<Dish>) {
		const response = await DishApi.updateAsync(action.payload);
		if (response.hasError()) {
			return;
		}

		const { dishes } = this.getState().dish;

		this.updateStore({
			dishes: dishes.filter((dish) => dish.id !== action.payload.id).concat(response.data),
		});
	}

	@watch
	async removeDish(action: Action<Dish['id']>) {
		const response = await DishApi.deleteAsync(action.payload);
		if (response.hasError()) {
			return;
		}

		const { dishes } = this.getState().dish;

		this.updateStore({
			dishes: dishes.filter((dish) => dish.id !== action.payload),
		});
	}
}

const dishController: DecoratedWatchedController<[
	'loadDishes',
	['loadDish', Dish['id']],
	['addDish', Dish],
	['updateDish', Dish],
	['removeDish', Dish['id']],
]> = DishController as any;
export { dishController as DishController };
