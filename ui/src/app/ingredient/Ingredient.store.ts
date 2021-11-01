import { Reducer } from 'app-redux-utils';
import { Ingredient } from '~models';

export class IngredientStore {
	ingredients: Ingredient[];

	constructor() {
		this.ingredients = [];
	}

	static update = 'INGREDIENT_update_store';
	static reducer = Reducer(new IngredientStore(), IngredientStore.update);
}
