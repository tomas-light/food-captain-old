import { MenuInScheduleEntity } from './entities';

export interface MenuInScheduleTable {
  allAsync(): Promise<MenuInScheduleEntity[]>;
  getAsync(schedule_id: number, menu_id: number): Promise<MenuInScheduleEntity | undefined>;

  insertAsync(entity: MenuInScheduleEntity): Promise<boolean>;
  updateAsync(entity: MenuInScheduleEntity): Promise<MenuInScheduleEntity | undefined>;
  deleteAsync(entity: Pick<MenuInScheduleEntity, 'schedule_id' | 'menu_id'>): Promise<boolean>;
}
