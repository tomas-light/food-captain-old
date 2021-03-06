import { Menu } from '@models';
import { Option } from '@select';

export function mapMenuDishesToOptions(menu: Menu): Option[] {
  return menu?.dishes?.map(dish => ({
    id: dish.id,
    title: dish.name,
  })) || [];
}
