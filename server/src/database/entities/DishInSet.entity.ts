import Sequelize, { DataTypes, Model } from 'sequelize';
import type { DishEntity, DishId } from './Dish.entity';
import type { DishSetEntity, DishSetId } from './DishSet.entity';

export interface DishInSetAttributes {
  dish_id: number;
  dish_set_id: number;
}

export type DishInSetCreationAttributes = DishInSetAttributes;

export class DishInSetEntity extends Model<DishInSetAttributes, DishInSetCreationAttributes> implements DishInSetAttributes {
  dish_id!: number;
  dish_set_id!: number;
/*

  // DishInSet belongsTo Dish via dish_id
  dish!: DishEntity;
  getDish!: Sequelize.BelongsToGetAssociationMixin<DishEntity>;
  setDish!: Sequelize.BelongsToSetAssociationMixin<DishEntity, DishId>;
  createDish!: Sequelize.BelongsToCreateAssociationMixin<DishEntity>;
  // DishInSet belongsTo DishSet via dish_set_id
  dish_set!: DishSetEntity;
  getDish_set!: Sequelize.BelongsToGetAssociationMixin<DishSetEntity>;
  setDish_set!: Sequelize.BelongsToSetAssociationMixin<DishSetEntity, DishSetId>;
  createDish_set!: Sequelize.BelongsToCreateAssociationMixin<DishSetEntity>;
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof DishInSetEntity {
    DishInSetEntity.init({
      dish_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'dish',
          key: 'id'
        },
        unique: 'unq_disehs_in_set'
      },
      dish_set_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'dish_set',
          key: 'id'
        },
        unique: 'unq_disehs_in_set'
      }
    }, {
      sequelize,
      tableName: 'dish_in_set',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'unq_disehs_in_set',
          unique: true,
          fields: [
            { name: 'dish_id' },
            { name: 'dish_set_id' },
          ]
        },
      ]
    });
    return DishInSetEntity;
  }
}
