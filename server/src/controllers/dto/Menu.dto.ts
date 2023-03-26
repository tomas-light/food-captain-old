import { DishInMenuDto } from './DishInMenu.dto';
import { UserDto } from './User.dto';

export interface MenuDto {
  id: number;
  name?: string;
  author?: UserDto;
  dishes?: DishInMenuDto[];
}
