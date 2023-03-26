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
  byIdAsync(id: number): Promise<ScheduleEntity | null | undefined>;

  getWithMenuByIdAsync(id: number): Promise<ScheduleWithMenuEntity[]>;

  insertAsync(entity: Omit<ScheduleEntity, 'id'>): Promise<number | null | undefined>;
  updateAsync(entity: MakeOptional<ScheduleEntity, 'author_id' | 'name'>): Promise<ScheduleEntity | null | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}

export {
  ScheduleTable,
  ScheduleWithMenuEntity,
}
