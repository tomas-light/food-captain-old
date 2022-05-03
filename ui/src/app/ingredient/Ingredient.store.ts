import { Reducer } from 'app-redux-utils';
import { Dimension, Ingredient } from '~models';

export class IngredientStore {
	ingredients: Ingredient[];
	dimensions: Dimension[];

	constructor() {
		this.ingredients = [];
		this.dimensions = [];
	}

	static update = 'INGREDIENT_update_store';
	static reducer = Reducer(new IngredientStore(), IngredientStore.update);
}
