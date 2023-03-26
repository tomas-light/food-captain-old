import { MakeOptional } from '@utils/types';
import { DishEntity, MenuEntity } from './entities';

interface MenuWithDateEntity extends MenuEntity {
  date: Date;
}

// @ts-ignore
interface MenuWithDishesEntity extends MenuEntity, Omit<DishEntity, 'id' | 'name'> {
  dish_id: number;
  dish_name: string;
  order_number?: number;
  image?: string
}

interface MenuTable {
  allAsync(): Promise<MenuEntity[]>;
  byIdAsync(id: number): Promise<MenuEntity | null>;
  byScheduleIdAsync(schedule_id: number): Promise<MenuWithDateEntity[]>;

  getWithDishesByIdAsync(id: number): Promise<MenuWithDishesEntity[]>;

  insertAsync(entity: Omit<MenuEntity, 'id'>): Promise<number | null | undefined>;
  updateAsync(entity: MakeOptional<MenuEntity, 'create_date' | 'last_update' | 'author_id'>): Promise<MenuEntity | null>;
  deleteAsync(id: number): Promise<boolean>;
}

export { MenuTable, MenuWithDateEntity, MenuWithDishesEntity };
