import { Logger } from '@utils/loggers';

import { DimensionTable } from './DimensionTable';
import { DishTable } from './DishTable';
import { DishInMenuTable } from './DishInMenuTable';
import { DishInSetTable } from './DishInSetTable';
import { DishSetTable } from './DishSetTable';
import { ImageTable } from './ImageTable';
import { IngredientTable } from './IngredientTable';
import { IngredientInSetTable } from './IngredientInSetTable';
import { IngredientSetTable } from './IngredientSetTable';
import { MenuTable } from './MenuTable';
import { MenuInScheduleTable } from './MenuInScheduleTable';
import { RecipeTable } from './RecipeTable';
import { RecipeImageTable } from './RecipeImageTable';
import { IngredientInRecipeTable } from './IngredientInRecipeTable';
import { RoleTable } from './RoleTable';
import { ScheduleTable } from './ScheduleTable';
import { UserTable } from './UserTable';
import { UserRoleTable } from './UserRoleTable';

export abstract class Database {
  static __constructorParams: InstanceType<any>[] = [Logger];

  constructor(
    readonly dimension: DimensionTable,
    readonly dish: DishTable,
    readonly dishInMenu: DishInMenuTable,
    readonly dishInSet: DishInSetTable,
    readonly dishSet: DishSetTable,
    readonly image: ImageTable,
    readonly ingredient: IngredientTable,
    readonly ingredientInSet: IngredientInSetTable,
    readonly ingredientSet: IngredientSetTable,
    readonly menu: MenuTable,
    readonly menuInSchedule: MenuInScheduleTable,
    readonly recipe: RecipeTable,
    readonly recipeImage: RecipeImageTable,
    readonly ingredientInRecipe: IngredientInRecipeTable,
    readonly role: RoleTable,
    readonly schedule: ScheduleTable,
    readonly user: UserTable,
    readonly userRole: UserRoleTable,
  ) {
    if (new.target === Database) {
      throw new TypeError(`Cannot construct Database instance directly`);
    }
  }
}
