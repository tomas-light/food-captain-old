import { Action, createAction, WatchedController, watch } from 'app-redux-utils';
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
		const response = await DishApi.getByIdAsync(action.payload);
		if (response.hasError()) {
			return;
		}

		const { dishes } = this.getState().dish;

		this.updateStore({
			dishes: dishes.filter((dish) => dish.id !== action.payload).concat(response.data),
		});
	}

	@watch
	async addDish(action: Action<{ dish: Dish, callback?: () => void }>) {
		const { dish, callback } = action.payload;

		const response = await DishApi.addAsync(dish);
		if (response.hasError()) {
			return;
		}

		const { dishes } = this.getState().dish;

		this.updateStore({
			dishes: dishes.concat(response.data),
		});

		callback && callback();
	}

	@watch
	async updateDish(action: Action<{ dish: Dish, callback?: () => void }>) {
		const { dish, callback } = action.payload;

		const response = await DishApi.updateAsync(dish);
		if (response.hasError()) {
			return;
		}

		const { dishes } = this.getState().dish;

		this.updateStore({
			dishes: dishes.filter((_dish) => _dish.id !== dish.id).concat(response.data),
		});

		callback && callback();
	}

	@watch
	async removeDish(action: Action<{ dishId: Dish['id'], callback?: () => void }>) {
		const { dishId, callback } = action.payload;

		const response = await DishApi.deleteAsync(dishId);
		if (response.hasError()) {
			return;
		}

		const { dishes } = this.getState().dish;

		this.updateStore({
			dishes: dishes.filter((dish) => dish.id !== dishId),
		});

		callback && callback();
	}
}

const dishController: WatchedController<DishController> = DishController as any;
export { dishController as DishController };
