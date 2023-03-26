import { Container } from 'cheap-di';
import { Sequelize } from 'sequelize';
import { Database } from '../Database';
import { PostgresDatabase } from '../postgres';

function registerDependency(container: Container) {
  const sequelize = new Sequelize(
    process.env.PGDATABASE || '',
    process.env.PGUSER || '',
    process.env.PGPASSWORD || '',
    {
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT || '5432', 10),
      dialect: 'postgres',
      // logging: false,
    }
  );

  sequelize.authenticate()
    .then(() => {
      console.log('Database connection has been established successfully.');
    })
    .catch(error => {
      console.error('Unable to connect to the database:', error);
    })
  ;
  // sequelize-auto -o "./models" -d food_captain -h localhost -u postgres -p 5432 -x root -e postgres

  container.registerInstance(sequelize).as(Sequelize);
  container.registerType(PostgresDatabase).as(Database);

  PostgresDatabase.init(sequelize);
}

export { registerDependency };
