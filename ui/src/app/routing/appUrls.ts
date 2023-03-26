import { Dish, Ingredient, Menu } from '~models';

const menuUrls = {
	menu: '/menu',
	menuDetails: '/menu/:menuId',
	getMenuDetailsPath: (menuId: Menu['id']) => `/menu/${menuId}`,
};

const dishUrls = {
	dish: '/dish',
	addDish: '/dish/add',
	dishDetails: '/dish/:dishId',
	getDishDetailsPath: (dishId: Dish['id']) => `/dish/${dishId}`,
	editDish: '/dish/:dishId/edit',
	getEditDishPath: (dishId: Dish['id']) => `/dish/${dishId}/edit`,
};

const ingredientUrls = {
	ingredient: '/ingredient',
	addIngredient: '/ingredient/add',
	editIngredient: '/ingredient/:ingredientId/edit',
	getEditIngredientPath: (ingredientId: Ingredient['id']) => `/ingredient/${ingredientId}/edit`,
};

const appUrls = {
	root: '/',
	schedule: '/schedule',

	...menuUrls,
	...dishUrls,
	...ingredientUrls,

	user: '/user',
};

export { appUrls };
