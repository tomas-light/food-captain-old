import { MakeOptional } from '@utils/types';
import { MenuEntity, ScheduleEntity } from './entities';

interface MenuWithDateEntity extends MenuEntity {
  date: Date;
}
interface ScheduleWithMenuEntity extends ScheduleEntity, Omit<MenuWithDateEntity, 'id' | 'name'> {
  menu_id: number;
  menu_name?: string;
}

interface ScheduleTable {
  allAsync(): Promise<ScheduleEntity[]>;
  byIdAsync(id: number): Promise<ScheduleEntity | undefined>;

  getWithMenuByIdAsync(id: number): Promise<ScheduleWithMenuEntity | undefined>;

  insertAsync(entity: Omit<ScheduleEntity, 'id'>): Promise<number | undefined>;
  updateAsync(entity: MakeOptional<ScheduleEntity, 'author_id' | 'name'>): Promise<ScheduleEntity | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}

export {
  ScheduleTable,
  ScheduleWithMenuEntity,
}
