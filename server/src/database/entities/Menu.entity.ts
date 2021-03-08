import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import { DishAttributes, DishEntity } from './Dish.entity';
import type { DishInMenuEntity } from './DishInMenu.entity';
import type { MenuInScheduleEntity } from './MenuInSchedule.entity';
import type { UserEntity, UserId } from './UserEntity';

export interface MenuAttributes {
  id: number;
  create_date: string;
  last_update: string;
  author_id?: number;
  name?: string;
}

export type MenuPk = 'id';
export type MenuId = MenuEntity[MenuPk];
export type MenuCreationAttributes = Optional<MenuAttributes, MenuPk>;

export class MenuEntity
  extends Model<MenuAttributes, MenuCreationAttributes>
  implements MenuAttributes,
  Partial<Pick<DishInMenuEntity, 'order_number'>> {

  id!: number;
  create_date!: string;
  last_update!: string;
  author_id?: number;
  name?: string;

  order_number?: number;
/*
  // Menu hasMany DishInMenu via menu_id
  dish_in_menus!: DishInMenuEntity[];
  getDish_in_menus!: Sequelize.HasManyGetAssociationsMixin<DishInMenuEntity>;
  setDish_in_menus!: Sequelize.HasManySetAssociationsMixin<DishInMenuEntity, number>;
  addDish_in_menu!: Sequelize.HasManyAddAssociationMixin<DishInMenuEntity, number>;
  addDish_in_menus!: Sequelize.HasManyAddAssociationsMixin<DishInMenuEntity, number>;
  createDish_in_menu!: Sequelize.HasManyCreateAssociationMixin<DishInMenuEntity>;
  removeDish_in_menu!: Sequelize.HasManyRemoveAssociationMixin<DishInMenuEntity, number>;
  removeDish_in_menus!: Sequelize.HasManyRemoveAssociationsMixin<DishInMenuEntity, number>;
  hasDish_in_menu!: Sequelize.HasManyHasAssociationMixin<DishInMenuEntity, number>;
  hasDish_in_menus!: Sequelize.HasManyHasAssociationsMixin<DishInMenuEntity, number>;
  countDish_in_menus!: Sequelize.HasManyCountAssociationsMixin;

  // Menu hasMany MenuInSchedule via menu_id
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

  // Menu belongsTo Users via author_id
  author!: UserEntity;
  getAuthor!: Sequelize.BelongsToGetAssociationMixin<UserEntity>;
  setAuthor!: Sequelize.BelongsToSetAssociationMixin<UserEntity, UserId>;
  createAuthor!: Sequelize.BelongsToCreateAssociationMixin<UserEntity>;
*/
  dish?: DishEntity;
  dishes?: DishEntity[];

  menu_in_schedules?: MenuInScheduleEntity[];
  author?: UserEntity;

  static initModel(sequelize: Sequelize.Sequelize) {
    MenuEntity.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      create_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE')
      },
      last_update: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE')
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
      tableName: 'menu',
      // schema: 'public',
      timestamps: false,
      // indexes: [
      //   {
      //     name: 'pk_menu_id',
      //     unique: true,
      //     fields: [
      //       { name: 'id' },
      //     ]
      //   },
      // ]
    });
  }
}
