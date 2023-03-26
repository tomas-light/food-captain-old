import { DishDto } from './Dish.dto';

export interface DishInMenuDto extends DishDto {
  order?: number;
}
