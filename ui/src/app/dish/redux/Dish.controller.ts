import { DishApi } from '@api';
import { SelectFieldOption } from '@select';
import { ControllerBase } from '@utils/controller';

import { DishActions } from './Dish.actions';
import { DishStore } from './Dish.store';

export class DishController extends ControllerBase {
	async loadDishes() {
		this.updateStore({
			dishesAreLoading: true,
		});

		const response = await DishApi.getAllAsync();
		if (response.hasError()) {
			this.updateStore({
				dishes: [],
				dishOptions: [],
				dishesAreLoading: false,
			});

			return;
		}

		this.updateStore({
			dishes: response.data,
			dishOptions: response.data.map(
				(dish) =>
					new SelectFieldOption<number>({
						id: dish.id,
						title: dish.name,
					})
			),
			dishesAreLoading: false,
		});
	}

	private updateStore(partialStore: Partial<DishStore>) {
		this.dispatch(DishActions.updateStore(partialStore));
	}
}
