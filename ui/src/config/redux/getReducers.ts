import { ReducersMapObject } from 'redux';
import { AppInitterStore } from '~app/AppInitter/redux/AppInitter.store';
import { DishStore } from '~app/dish/Dish.store';
import { IngredientStore } from '~app/ingredient/Ingredient.store';
import { MenuStore } from '~app/menu/Menu.store';
import { UserStore } from '~app/user/User.store';
import { NotifierStore } from '~Notifier/Notifier.store';
import { State } from '~State';

export function getReducers(): ReducersMapObject<State, any> {
	return {
		appInitter: AppInitterStore.reducer,
		notifier: NotifierStore.reducer,
		menu: MenuStore.reducer,
		user: UserStore.reducer,
		dish: DishStore.reducer,
		ingredient: IngredientStore.reducer,
	};
}
