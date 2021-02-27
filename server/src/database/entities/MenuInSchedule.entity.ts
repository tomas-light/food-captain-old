import Sequelize, { DataTypes, Model } from 'sequelize';
import type { MenuEntity, MenuId } from './Menu.entity';
import type { ScheduleEntity, ScheduleId } from './Schedule.entity';

export interface MenuInScheduleAttributes {
  schedule_id: number;
  menu_id: number;
  date: string;
}

export type MenuInScheduleCreationAttributes = MenuInScheduleAttributes;

export class MenuInScheduleEntity extends Model<MenuInScheduleAttributes, MenuInScheduleCreationAttributes> implements MenuInScheduleAttributes {
  schedule_id!: number;
  menu_id!: number;
  date!: string;

/*
  // MenuInSchedule belongsTo Menu via menu_id
  menu!: MenuEntity;
  getMenu!: Sequelize.BelongsToGetAssociationMixin<MenuEntity>;
  setMenu!: Sequelize.BelongsToSetAssociationMixin<MenuEntity, MenuId>;
  createMenu!: Sequelize.BelongsToCreateAssociationMixin<MenuEntity>;

  // MenuInSchedule belongsTo Schedule via schedule_id
  schedule!: ScheduleEntity;
  getSchedule!: Sequelize.BelongsToGetAssociationMixin<ScheduleEntity>;
  setSchedule!: Sequelize.BelongsToSetAssociationMixin<ScheduleEntity, ScheduleId>;
  createSchedule!: Sequelize.BelongsToCreateAssociationMixin<ScheduleEntity>;
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof MenuInScheduleEntity {
    MenuInScheduleEntity.init({
      schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'schedule',
          key: 'id'
        },
        unique: 'unq_menu_in_schedule'
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'menu',
          key: 'id'
        },
        unique: 'unq_menu_in_schedule'
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE'),
        unique: 'unq_menu_in_schedule'
      }
    }, {
      sequelize,
      tableName: 'menu_in_schedule',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'unq_menu_in_schedule',
          unique: true,
          fields: [
            { name: 'schedule_id' },
            { name: 'menu_id' },
            { name: 'date' },
          ]
        },
      ]
    });
    return MenuInScheduleEntity;
  }
}
