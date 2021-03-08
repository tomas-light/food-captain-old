import { DishInMenuEntity } from './entities';
import { DishInMenuAttributes } from './entities/DishInMenu.entity';

export interface DishInMenuTable {
  allAsync(): Promise<DishInMenuEntity[]>;
  getAsync(menu_id: number, dish_id: number): Promise<DishInMenuEntity | null | undefined>;

  insertAsync(entity: DishInMenuAttributes): Promise<boolean>;
  updateAsync(entity: DishInMenuAttributes): Promise<DishInMenuEntity | null | undefined>;
  deleteAsync(entity: Pick<DishInMenuAttributes, 'menu_id' | 'dish_id'>): Promise<boolean>;
  deleteByIdsAsync(dish_ids: number[]): Promise<boolean>;
  deleteAllByMenuIdAsync(menu_id: number): Promise<boolean>;
  deleteAllByDishIdAsync(dish_id: number): Promise<boolean>;
}
