import { MakeOptional } from '@utils/types';
import { DishEntity } from './entities';

interface MenuDishesEntity extends DishEntity {
  menu_id: number;
  order_number?: number;
}

interface DishTable {
  allAsync(): Promise<DishEntity[]>;
  byIdAsync(id: number): Promise<DishEntity | null | undefined>;
  byMenuIdAsync(menuId: number): Promise<MenuDishesEntity[]>;
  byMenuIdsAsync(menuIds: number[]): Promise<MenuDishesEntity[]>;

  insertAsync(entity: Omit<DishEntity, 'id'>): Promise<number | null | undefined>;
  updateAsync(entity: MakeOptional<DishEntity, 'name'>): Promise<DishEntity | null | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}

export type { DishTable, MenuDishesEntity };
