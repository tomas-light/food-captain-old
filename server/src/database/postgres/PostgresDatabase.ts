import { Pool } from 'pg';

import { Logger } from '@utils/loggers';
import { Database } from '../Database';

import { PgDimensionTable } from './PgDimensionTable';
import { PgDishTable } from './PgDishTable';
import { PgDishInMenuTable } from './PgDishInMenuTable';
import { PgDishInSetTable } from './PgDishInSetTable';
import { PgDishSetTable } from './PgDishSetTable';
import { PgImageTable } from './PgImageTable';
import { PgIngredientTable } from './PgIngredientTable';
import { PgIngredientInSetTable } from './PgIngredientInSetTable';
import { PgIngredientSetTable } from './PgIngredientSetTable';
import { PgMenuTable } from './PgMenuTable';
import { PgMenuInScheduleTable } from './PgMenuInScheduleTable';
import { PgRecipeTable } from './PgRecipeTable';
import { PgRecipeImageTable } from './PgRecipeImageTable';
import { PgIngredientInRecipeTable } from './PgIngredientInRecipeTable';
import { PgRoleTable } from './PgRoleTable';
import { PgScheduleTable } from './PgScheduleTable';
import { PgUserTable } from './PgUserTable';
import { PgUserRoleTable } from './PgUserRoleTable';

export class PostgresDatabase extends Database {
  static __constructorParams: InstanceType<any>[] = [Logger];

  constructor(logger: Logger) {
    const pool = new Pool();
    super(
      new PgDimensionTable(logger, pool),
      new PgDishTable(logger, pool),
      new PgDishInMenuTable(logger, pool),
      new PgDishInSetTable(logger, pool),
      new PgDishSetTable(logger, pool),
      new PgImageTable(logger, pool),
      new PgIngredientTable(logger, pool),
      new PgIngredientInSetTable(logger, pool),
      new PgIngredientSetTable(logger, pool),
      new PgMenuTable(logger, pool),
      new PgMenuInScheduleTable(logger, pool),
      new PgRecipeTable(logger, pool),
      new PgRecipeImageTable(logger, pool),
      new PgIngredientInRecipeTable(logger, pool),
      new PgRoleTable(logger, pool),
      new PgScheduleTable(logger, pool),
      new PgUserTable(logger, pool),
      new PgUserRoleTable(logger, pool),
    );
  }
}
