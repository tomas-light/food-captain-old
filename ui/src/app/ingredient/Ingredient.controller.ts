import { Action, createAction, DecoratedWatchedController, watch } from 'app-redux-utils';
import { IngredientApi } from '~api';
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
	async addIngredient(action: Action<Ingredient>) {
		const response = await IngredientApi.addAsync(action.payload);
		if (response.hasError()) {
			return;
		}

		const { ingredients } = this.getState().ingredient;

		this.updateStore({
			ingredients: ingredients.concat(response.data),
		});
	}

	@watch
	async updateIngredient(action: Action<Ingredient>) {
		const response = await IngredientApi.updateAsync(action.payload);
		if (response.hasError()) {
			return;
		}

		const { ingredients } = this.getState().ingredient;

		this.updateStore({
			ingredients: ingredients.filter((dish) => dish.id !== action.payload.id).concat(response.data),
		});
	}

	@watch
	async removeIngredient(action: Action<Ingredient['id']>) {
		const response = await IngredientApi.deleteAsync(action.payload);
		if (response.hasError()) {
			return;
		}

		const { ingredients } = this.getState().ingredient;

		this.updateStore({
			ingredients: ingredients.filter((dish) => dish.id !== action.payload),
		});
	}
}

const ingredientController: DecoratedWatchedController<[
	'loadIngredients',
	['addIngredient', Ingredient],
	['updateIngredient', Ingredient],
	['removeIngredient', Ingredient['id']],
]> =
  IngredientController as any;
export { ingredientController as IngredientController };
