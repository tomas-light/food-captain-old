import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { MenuInScheduleEntity } from './MenuInSchedule.entity';
import type { UserEntity, UserId } from './UserEntity';

export interface ScheduleAttributes {
  id: number;
  author_id?: number;
  name?: string;
}

export type SchedulePk = 'id';
export type ScheduleId = ScheduleEntity[SchedulePk];
export type ScheduleCreationAttributes = Optional<ScheduleAttributes, SchedulePk>;

export class ScheduleEntity extends Model<ScheduleAttributes, ScheduleCreationAttributes> implements ScheduleAttributes {
  id!: number;
  author_id?: number;
  name?: string;

/*
  // Schedule hasMany MenuInSchedule via schedule_id
  menu_in_schedules!: MenuInScheduleEntity[];
  getMenu_in_schedules!: Sequelize.HasManyGetAssociationsMixin<MenuInScheduleEntity>;
  setMenu_in_schedules!: Sequelize.HasManySetAssociationsMixin<MenuInScheduleEntity, number>;
  addMenu_in_schedule!: Sequelize.HasManyAddAssociationMixin<MenuInScheduleEntity, number>;
  addMenu_in_schedules!: Sequelize.HasManyAddAssociationsMixin<MenuInScheduleEntity, number>;
  createMenu_in_schedule!: Sequelize.HasManyCreateAssociationMixin<MenuInScheduleEntity>;
  removeMenu_in_schedule!: Sequelize.HasManyRemoveAssociationMixin<MenuInScheduleEntity, number>;
  removeMenu_in_schedules!: Sequelize.HasManyRemoveAssociationsMixin<MenuInScheduleEntity, number>;
  hasMenu_in_schedule!: Sequelize.HasManyHasAssociationMixin<MenuInScheduleEntity, number>;
  hasMenu_in_schedules!: Sequelize.HasManyHasAssociationsMixin<MenuInScheduleEntity, number>;
  countMenu_in_schedules!: Sequelize.HasManyCountAssociationsMixin;

  // Schedule belongsTo Users via author_id
  author!: UserEntity;
  getAuthor!: Sequelize.BelongsToGetAssociationMixin<UserEntity>;
  setAuthor!: Sequelize.BelongsToSetAssociationMixin<UserEntity, UserId>;
  createAuthor!: Sequelize.BelongsToCreateAssociationMixin<UserEntity>;
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof ScheduleEntity {
    ScheduleEntity.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'schedule',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_schedule_id',
          unique: true,
          fields: [
            { name: 'id' },
          ]
        },
      ]
    });
    return ScheduleEntity;
  }
}
