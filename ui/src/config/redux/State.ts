import { AppInitterStore } from '~app/AppInitter/redux/AppInitter.store';
import { DishStore } from '~app/dish/Dish.store';
import { IngredientStore } from '~app/ingredient/Ingredient.store';
import { MenuStore } from '~app/menu/Menu.store';
import { UserStore } from '~app/user/User.store';
import { NotifierStore } from '~Notifier/Notifier.store';

export interface State {
	appInitter: AppInitterStore;
	notifier: NotifierStore;
	menu: MenuStore;
	user: UserStore;
	dish: DishStore;
	ingredient: IngredientStore;
}
