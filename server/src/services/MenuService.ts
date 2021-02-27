import { MakeOptional } from '@utils/types';
import { Database } from '../database';
import { DishEntity, DishInMenuEntity } from '../database/entities';
import { DishService } from './DishService';
import { ImageService } from './ImageService';
import { DishInMenu, Image, Menu, User } from './models';
import { UserService } from './UserService';

export class MenuService {
  static __constructorParams: InstanceType<any>[] = [Database, DishService, UserService, ImageService];

  constructor(
    private readonly db: Database,
    private readonly dishService: DishService,
    private readonly userService: UserService,
    private readonly imageService: ImageService,
  ) {
  }

  /*async getAllAsync(): Promise<Menu[]> {
    const entities = await this.db.menu.allAsync();

    const menus = entities.map(entity => ({
      id: entity.id,
      name: entity.name,
      createDate: entity.create_date,
      lastUpdate: entity.last_update,
    }) as Menu);

    const userIds = entities.map(entity => entity.author_id).filter(id => typeof id === 'number') as number[];
    if (userIds.length) {
      const users = await this.db.user.byIdsAsync(userIds);
      users.forEach(user => {
        const menuId = entities.find(entity => entity.author_id)!.id;
        const menu = menus.find(_menu => _menu.id === menuId)!;
        menu.author = user;
      })
    }

    const menuIds = menus.map(menu => menu.id);
    if (menuIds.length) {
      const menuDishes = await this.db.dish.byMenuIdsAsync(menuIds);
      menus.forEach(menu => {
        menu.dishes = menuDishes.filter(dish => dish.menu_id === menu.id);
      });
    }

    return menus;
  }*/

  async getAllAsync(): Promise<Menu[]> {
    const entities = await this.db.menu.allAsync();

    const menus = entities.map(entity => {
      const menu = entity.get();
      return {
        id: menu.id,
        name: menu.name,
        createDate: new Date(menu.create_date),
        lastUpdate: new Date(menu.last_update),
        author: entity.author,
        dishes: entity.dishes?.map(dishEntity => {
          const dish = dishEntity.get();
          return {
            id: dish.id,
            name: dish.name,
            description: dish.description,
            image: dishEntity.image,
            order: dishEntity.menu?.order_number,
          };
        }),
      } as Menu;
    });

    // const userIds = entities.map(entity => entity.author_id).filter(id => typeof id === 'number') as number[];
    // if (userIds.length) {
    //   const users = await this.db.user.byIdsAsync(userIds);
    //   users.forEach(user => {
    //     const menuId = entities.find(entity => entity.author_id)!.id;
    //     const menu = menus.find(_menu => _menu.id === menuId)!;
    //     menu.author = user;
    //   })
    // }

    return menus;
  }

  async getMenuByIdAsync(menuId: number): Promise<Menu | null | undefined> {
    const menuWithDishesEntities = await this.db.menu.getWithDishesByIdAsync(menuId);
    if (!menuWithDishesEntities.length) {
      return undefined;
    }

    const [menuEntity] = menuWithDishesEntities;

    const menu: Menu = {
      id: menuEntity.id,
      name: menuEntity.name,
// @ts-ignore
      createDate: menuEntity.create_date,
// @ts-ignore
      lastUpdate: menuEntity.last_update,
      dishes: [],
    }

    if (menuEntity.author_id) {
// @ts-ignore
      menu.author = await this.userService.getUserByIdAsync(menuEntity.author_id);
    }

    await menuWithDishesEntities.forEachAsync(async entity => {
      let image: Image | undefined;
      if (entity.image_id) {
// @ts-ignore
        image = await this.imageService.getImageByIdAsync(entity.image_id);
      }

      menu.dishes!.push({
        id: entity.dish_id,
        name: entity.dish_name,
        description: entity.description,
        order: entity.order_number,
        image,
      });
    })

    return menu;
  }

  async addAsync(menu: MakeOptional<Menu, 'id' | 'createDate' | 'lastUpdate'>): Promise<Menu> {
    const now = this.getDateNow();
// @ts-ignore
    menu.id = await this.db.menu.insertAsync({
      name: menu.name,
// @ts-ignore
      create_date: menu.createDate || now,
// @ts-ignore
      last_update: menu.lastUpdate || now,
      author_id: menu.author?.id,
    });

    if (typeof menu.id !== 'undefined' && typeof menu.dishes !== 'undefined') {
      await menu.dishes.forEachAsync(async dish => {
        if (typeof dish.id !== 'number') {
          const newDish = await this.dishService.addAsync(dish);
          dish.id = newDish.id;
        }

// @ts-ignore
        await this.db.dishInMenu.insertAsync({
          dish_id: dish.id,
          menu_id: menu.id!,
          order_number: dish.order,
        });
      });
    }

    return menu as Menu;
  }

  private getDateNow() {
    return new Date(Date.now()); // todo: do we need UTC conversation here?
  }

  async updateAsync(menu: MakeOptional<Menu, 'createDate' | 'lastUpdate'>): Promise<Menu | undefined> {
    menu.lastUpdate = this.getDateNow();

// @ts-ignore
    const menuEntity = await this.db.menu.updateAsync(menu);
    if (!menuEntity) {
      return undefined;
    }

    const currentDishIds = menu.dishes?.map(dish => dish.id) || [];

    const dishesIdForDelete: number[] = [];
    let menuDishes = await this.db.dish.byMenuIdAsync(menuEntity.id);
    menuDishes.forEach(dish => {
      if (!currentDishIds || !currentDishIds.includes(dish.id)) {
        dishesIdForDelete.push(dish.id);
      }
    });

    const dishesIdBeforeUpdate = menuDishes.map(dish => dish.id);

    const dishesForAdding: Omit<DishInMenuEntity, 'menu_id'>[] = [];
    currentDishIds.forEach(id => {
      if (!dishesIdBeforeUpdate.includes(id)) {
        const dish = menu.dishes!.find(_dish => _dish.id === id);
// @ts-ignore
        dishesForAdding.push({
          dish_id: id,
          order_number: dish!.order,
        })
      }
    });

    await this.db.dishInMenu.deleteByIdsAsync(dishesIdForDelete);

    await dishesForAdding.forEachAsync(async dish => {
// @ts-ignore
      await this.db.dishInMenu.insertAsync({
        menu_id: menuEntity.id,
        dish_id: dish.dish_id,
        order_number: dish.order_number,
      });
    });

    let author: User | undefined;
    if (menuEntity.author_id) {
// @ts-ignore
      author = await this.userService.getUserByIdAsync(menuEntity.author_id);
    }

    const updatedMenu: Menu = {
      id: menuEntity.id,
      name: menuEntity.name,
// @ts-ignore
      createDate: menuEntity.create_date,
// @ts-ignore
      lastUpdate: menuEntity.last_update,
      author,
      dishes: []
    };

    menuDishes = await this.db.dish.byMenuIdAsync(menuEntity.id);

    await menuDishes.forEachAsync(async entity => {
      let image: Image | undefined;
      if (entity.image_id) {
// @ts-ignore
        image = await this.imageService.getImageByIdAsync(entity.image_id);
      }

      updatedMenu.dishes!.push({
        id: entity.id,
        name: entity.name,
        description: entity.description,
        order: entity.order_number,
        image,
      });
    });
  }

  async deleteAsync(menu: Menu): Promise<boolean> {
    const menuWasDeletedFromSchedules = await this.db.menuInSchedule.deleteAllByMenuIdAsync(menu.id);
    if (!menuWasDeletedFromSchedules) {
      return false;
    }

    const dishesWereDeletedFromMenu = await this.db.dishInMenu.deleteAllByMenuIdAsync(menu.id);
    if (!dishesWereDeletedFromMenu) {
      return false;
    }

    return await this.db.menu.deleteAsync(menu.id);
  }
}
