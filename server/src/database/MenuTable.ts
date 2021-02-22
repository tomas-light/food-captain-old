import { MakeOptional } from '@utils/types';
import { DishEntity, MenuEntity } from './entities';

interface MenuWithDishesEntity extends MenuEntity, Omit<DishEntity, 'id' | 'name'> {
  dish_id: number;
  dish_name: string;
  order_number?: number;
  image?: string
}

interface MenuTable {
  allAsync(): Promise<MenuEntity[]>;
  byIdAsync(id: number): Promise<MenuEntity | undefined>;

  getWithDishesByIdAsync(id: number): Promise<MenuWithDishesEntity | undefined>;

  insertAsync(entity: Omit<MenuEntity, 'id'>): Promise<number | undefined>;
  updateAsync(entity: MakeOptional<MenuEntity, 'create_date' | 'last_update' | 'author_id'>): Promise<MenuEntity | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}

export { MenuTable, MenuWithDishesEntity };
