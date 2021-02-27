import Sequelize, { DataTypes, Model } from 'sequelize';
import type { DishEntity, DishId } from './Dish.entity';
import type { MenuEntity, MenuId } from './Menu.entity';

export interface DishInMenuAttributes {
  menu_id: number;
  dish_id: number;
  order_number?: number;
}

export type DishInMenuCreationAttributes = DishInMenuAttributes;

export class DishInMenuEntity
  extends Model<DishInMenuAttributes, DishInMenuCreationAttributes>
  implements DishInMenuAttributes {

  menu_id!: number;
  dish_id!: number;
  order_number?: number;
/*
  // DishInMenu belongsTo Dish via dish_id
  dish!: DishEntity;
  getDish!: Sequelize.BelongsToGetAssociationMixin<DishEntity>;
  setDish!: Sequelize.BelongsToSetAssociationMixin<DishEntity, DishId>;
  createDish!: Sequelize.BelongsToCreateAssociationMixin<DishEntity>;

  // DishInMenu belongsTo Menu via menu_id
  menu!: MenuEntity;
  getMenu!: Sequelize.BelongsToGetAssociationMixin<MenuEntity>;
  setMenu!: Sequelize.BelongsToSetAssociationMixin<MenuEntity, MenuId>;
  createMenu!: Sequelize.BelongsToCreateAssociationMixin<MenuEntity>;
*/
  // dish?: DishEntity;
  // menu?: MenuEntity;

  static initModel(sequelize: Sequelize.Sequelize) {
    DishInMenuEntity.init({
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MenuEntity',
          key: 'id'
        },
        unique: 'unq_dish_in_menu'
      },
      dish_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'DishEntity',
          key: 'id'
        },
        unique: 'unq_dish_in_menu'
      },
      order_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: 'unq_dish_in_menu'
      }
    }, {
      sequelize,
      tableName: 'dish_in_menu',
      // schema: 'public',
      timestamps: false,
      // indexes: [
      //   {
      //     name: 'unq_dish_in_menu',
      //     unique: true,
      //     fields: [
      //       { name: 'menu_id' },
      //       { name: 'dish_id' },
      //       { name: 'order_number' },
      //     ]
      //   },
      // ]
    });
  }
}
