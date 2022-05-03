import { Action, createAction, WatchedController, watch } from 'app-redux-utils';
import { DimensionApi, IngredientApi } from '~api';
import { Ingredient } from '~models';
import { ControllerBase } from '~app/ControllerBase';
import { IngredientStore } from './Ingredient.store';

@watch
class IngredientController extends ControllerBase {
	private updateStore(partialStore: Partial<IngredientStore>) {
		this.dispatch(createAction(IngredientStore.update, partialStore));
	}

	@watch
	async loadIngredients() {
		const response = await IngredientApi.getAllAsync();
		if (response.hasError()) {
			this.updateStore({
				ingredients: [],
			});

			return;
		}

		this.updateStore({
			ingredients: response.data,
		});
	}

	@watch
	async loadDimensions() {
		const response = await DimensionApi.getAllAsync();
		if (response.hasError()) {
			this.updateStore({
				dimensions: [],
			});

			return;
		}

		this.updateStore({
			dimensions: response.data,
		});
	}

	@watch
	async addIngredient(action: Action<{ ingredient: Ingredient, callback?: () => void }>) {
		const { ingredient, callback } = action.payload;

		const response = await IngredientApi.addAsync(ingredient);
		if (response.hasError()) {
			return;
		}

		const { ingredients } = this.getState().ingredient;

		this.updateStore({
			ingredients: ingredients.concat(response.data),
		});

		callback && callback();
	}

	@watch
	async updateIngredient(action: Action<{ ingredient: Ingredient, callback?: () => void }>) {
		const { ingredient, callback } = action.payload;

		const response = await IngredientApi.updateAsync(ingredient);
		if (response.hasError()) {
			return;
		}

		const { ingredients } = this.getState().ingredient;

		this.updateStore({
			ingredients: ingredients.filter((dish) => dish.id !== ingredient.id).concat(response.data),
		});

		callback && callback();
	}

	@watch
	async removeIngredient(action: Action<{ ingredientId: Ingredient['id'], callback?: () => void }>) {
		const { ingredientId, callback } = action.payload;

		const response = await IngredientApi.deleteAsync(ingredientId);
		if (response.hasError()) {
			return;
		}

		const { ingredients } = this.getState().ingredient;

		this.updateStore({
			ingredients: ingredients.filter((dish) => dish.id !== ingredientId),
		});

		callback && callback();
	}
}

const ingredientController: WatchedController<IngredientController> = IngredientController as any;
export { ingredientController as IngredientController };
