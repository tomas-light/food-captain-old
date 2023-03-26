import { Pool } from 'pg';
import { Sequelize } from 'sequelize';

import { Logger } from '@utils/loggers';
import { metadata } from '@utils/metadata';
import { Database } from '../Database';
import { initEntities } from '../entities';

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

@metadata
export class PostgresDatabase extends Database {
  private readonly sequelize: Sequelize;

  constructor(
    logger: Logger,
    sequelize: Sequelize
  ) {
    const pool = new Pool();
    super(
      new PgDimensionTable(logger, pool, sequelize),
      new PgDishTable(logger, pool, sequelize),
      new PgDishInMenuTable(logger, pool, sequelize),
      new PgDishInSetTable(logger, pool, sequelize),
      new PgDishSetTable(logger, pool, sequelize),
      new PgImageTable(logger, pool, sequelize),
      new PgIngredientTable(logger, pool, sequelize),
      new PgIngredientInSetTable(logger, pool, sequelize),
      new PgIngredientSetTable(logger, pool, sequelize),
      new PgMenuTable(logger, pool, sequelize),
      new PgMenuInScheduleTable(logger, pool, sequelize),
      new PgRecipeTable(logger, pool, sequelize),
      new PgRecipeImageTable(logger, pool, sequelize),
      new PgIngredientInRecipeTable(logger, pool, sequelize),
      new PgRoleTable(logger, pool, sequelize),
      new PgScheduleTable(logger, pool, sequelize),
      new PgUserTable(logger, pool, sequelize),
      new PgUserRoleTable(logger, pool, sequelize),
    );

    this.sequelize = sequelize;
  }

  static init(sequelize: Sequelize) {
    initEntities(sequelize);
    sequelize.sync().catch(error => {
      console.error(error);
    });
  }
}
