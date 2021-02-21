import { Pool } from 'pg';

import { Logger } from '@utils/loggers';
import {
  DimensionEntity,
  DishEntity,
  DishInMenuEntity,
  DishInSetEntity,
  DishSetEntity,
  ImageEntity,
  IngredientEntity,
  IngredientInSetEntity,
  IngredientSetEntity,
  MenuEntity,
  MenuInScheduleEntity,
  RecipeEntity,
  RecipeImageEntity,
  RecipeIngredientEntity,
  RoleEntity,
  ScheduleEntity,
  UserEntity,
  UserRoleEntity,
} from './entities';
import { UserTable } from './tables';

export class Database {
  static __constructorParams: InstanceType<any>[] = [Logger];

  // readonly dimension: Table<DimensionEntity>;
  // readonly dish: Table<DishEntity>;
  // readonly dishInMenu: Table<DishInMenuEntity>;
  // readonly dishInSet: Table<DishInSetEntity>;
  // readonly dishSet: Table<DishSetEntity>;
  // readonly image: Table<ImageEntity>;
  // readonly ingredient: Table<IngredientEntity>;
  // readonly ingredientInSet: Table<IngredientInSetEntity>;
  // readonly ingredientSet: Table<IngredientSetEntity>;
  // readonly menu: Table<MenuEntity>;
  // readonly menuInSchedule: Table<MenuInScheduleEntity>;
  // readonly recipe: Table<RecipeEntity>;
  // readonly recipeImage: Table<RecipeImageEntity>;
  // readonly recipeIngredient: Table<RecipeIngredientEntity>;
  // readonly role: Table<RoleEntity>;
  // readonly schedule: Table<ScheduleEntity>;
  readonly user: UserTable;
  // readonly userRole: Table<UserRoleEntity>;

  constructor(logger: Logger) {
    const pool = new Pool();

    // this.dimension = table<DimensionEntity>();
    // this.dish = table<DishEntity>();
    // this.dishInMenu = table<DishInMenuEntity>();
    // this.dishInSet = table<DishInSetEntity>();
    // this.dishSet = table<DishSetEntity>();
    // this.image = table<ImageEntity>();
    // this.ingredient = table<IngredientEntity>();
    // this.ingredientInSet = table<IngredientInSetEntity>();
    // this.ingredientSet = table<IngredientSetEntity>();
    // this.menu = table<MenuEntity>();
    // this.menuInSchedule = table<MenuInScheduleEntity>();
    // this.recipe = table<RecipeEntity>();
    // this.recipeImage = table<RecipeImageEntity>();
    // this.recipeIngredient = table<RecipeIngredientEntity>();
    // this.role = table<RoleEntity>();
    // this.schedule = table<ScheduleEntity>();
    this.user = new UserTable(logger, pool);
    // this.userRole = table<UserRoleEntity>();
  }
}
