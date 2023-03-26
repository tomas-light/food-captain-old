import { Logger } from '@utils/loggers';
import { metadata } from '@utils/metadata';
import { MakeOptional } from '@utils/types';
import { Database } from '../database';
import { DishInMenuEntity, MenuInScheduleEntity } from '../database/entities';
import { MenuService } from './MenuService';
import { Image, Schedule, User } from './models';
import { UserService } from './UserService';

@metadata
export class ScheduleService {
  constructor(
    private readonly db: Database,
    private readonly logger: Logger,
    private readonly menuService: MenuService,
    private readonly userService: UserService,
    ) {
  }

  getAllAsync(): Promise<Schedule[]> {
    return this.db.schedule.allAsync();
  }

  async getScheduleByIdAsync(scheduleId: number): Promise<Schedule | undefined> {
    const scheduleEntities = await this.db.schedule.getWithMenuByIdAsync(scheduleId);
    if (!scheduleEntities) {
      return undefined;
    }

    const [scheduleEntity] = scheduleEntities;

    let author: User | undefined;
    if (scheduleEntity.author_id) {
// @ts-ignore
      author = await this.userService.getUserByIdAsync(scheduleEntity.author_id);
    }

    const schedule: Schedule = {
      id: scheduleEntity.id,
      name: scheduleEntity.name,
      author,
      menus: [],
    };

    await scheduleEntities.forEachAsync(async scheduleWithMenu => {
      let menuAuthor: User | undefined;
      if (scheduleWithMenu.author_id) {
// @ts-ignore
        menuAuthor = await this.userService.getUserByIdAsync(scheduleWithMenu.author_id);
      }

      schedule.menus!.push({
        id: scheduleWithMenu.menu_id,
        name: scheduleWithMenu.menu_name,
        date: scheduleWithMenu.date,
// @ts-ignore
        createDate: scheduleWithMenu.create_date,
// @ts-ignore
        lastUpdate: scheduleWithMenu.last_update,
        author: menuAuthor,
      });
    });

    return schedule;
  }

  async addAsync(schedule: MakeOptional<Schedule, 'id'>): Promise<Schedule> {
// @ts-ignore
    schedule.id = await this.db.schedule.insertAsync({
      name: schedule.name,
      author_id: schedule.author?.id,
    });

    if (schedule.menus) {
      await schedule.menus!.forEachAsync(async menu => {
        try {
          if (typeof menu.id !== 'number') {
            const addedMenu = await this.menuService.addAsync(menu);
            menu.id = addedMenu.id;
          }

          await this.db.menuInSchedule.insertAsync({
            schedule_id: schedule.id!,
            menu_id: menu.id,
// @ts-ignore
            date: menu.date,
          });
        }
        catch (error: any) {
          this.logger.error(error);
        }
      });
    }

    return schedule as Schedule;
  }

  async updateAsync(schedule: Schedule): Promise<Schedule | undefined> {
// @ts-ignore
    const scheduleEntity = await this.db.schedule.updateAsync(schedule);
    if (!scheduleEntity) {
      return undefined;
    }

    let author: User | undefined;
    if (scheduleEntity.author_id) {
// @ts-ignore
      author = await this.userService.getUserByIdAsync(scheduleEntity.author_id);
    }

    const currentMenusIds = schedule.menus?.map(menu => menu.id) || [];

    const menusIdForDelete: number[] = [];
    let scheduleMenus = await this.db.menu.byScheduleIdAsync(scheduleEntity.id);
    scheduleMenus.forEach(dish => {
      if (!currentMenusIds || !currentMenusIds.includes(dish.id)) {
        menusIdForDelete.push(dish.id);
      }
    });

    const menusIdBeforeUpdate = scheduleMenus.map(menu => menu.id);

    const menusForAdding: Omit<MenuInScheduleEntity, 'schedule_id'>[] = [];
    currentMenusIds.forEach(id => {
      if (!menusIdBeforeUpdate.includes(id)) {
        const menu = schedule.menus!.find(_menu => _menu.id === id);
        menusForAdding.push({
          menu_id: id,
// @ts-ignore
          date: menu!.date,
        })
      }
    });

    await this.db.menuInSchedule.deleteByIdsAsync(menusIdForDelete);

    await menusForAdding.forEachAsync(async menu => {
// @ts-ignore
      await this.db.menuInSchedule.insertAsync({
        schedule_id: scheduleEntity.id,
        menu_id: menu.menu_id,
        date: menu.date,
      });
    });

    const updatedSchedule: Schedule = {
      id: scheduleEntity.id,
      name: scheduleEntity.name,
      author,
      menus: [],
    };

    scheduleMenus = await this.db.menu.byScheduleIdAsync(scheduleEntity.id);

    await scheduleMenus.forEachAsync(async entity => {
      let author: User | undefined;
      if (entity.author_id) {
// @ts-ignore
        author = await this.userService.getUserByIdAsync(entity.author_id);
      }

      updatedSchedule.menus!.push({
        id: entity.id,
        name: entity.name,
// @ts-ignore
        createDate: entity.create_date,
// @ts-ignore
        lastUpdate: entity.last_update,
// @ts-ignore
        date: entity.create_date,
        author,
      });
    });

    return updatedSchedule;
  }

  async deleteAsync(schedule: Schedule): Promise<boolean> {
    const menuWasDeletedFromSchedules = await this.db.menuInSchedule.deleteAllByScheduleIdAsync(schedule.id);
    if (!menuWasDeletedFromSchedules) {
      return false;
    }

    return await this.db.user.deleteAsync(schedule.id);
  }
}
