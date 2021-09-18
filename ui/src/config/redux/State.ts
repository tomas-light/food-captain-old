import { AppInitterStore } from '@app/AppInitter/redux';
import { NotifierStore } from '@Notifier';
import { MenuStore } from '@app/menu/redux';
import { UserStore } from '@app/user/redux';
import { DishStore } from '@app/dish/redux';

export interface State {
  appInitter: AppInitterStore;
  notifier: NotifierStore;
  menu: MenuStore;
  user: UserStore;
  dish: DishStore;
}
