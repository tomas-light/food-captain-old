import Sequelize, { DataTypes, Model } from 'sequelize';
import type { IngredientEntity, IngredientId } from './Ingredient.entity';
import type { IngredientSetEntity, IngredientSetId } from './IngredientSet.entity';

export interface IngredientInSetAttributes {
  ingredient_id: number;
  ingredient_set_id: number;
}

export type IngredientInSetCreationAttributes = IngredientInSetAttributes;

export class IngredientInSetEntity extends Model<IngredientInSetAttributes, IngredientInSetCreationAttributes> implements IngredientInSetAttributes {
  ingredient_id!: number;
  ingredient_set_id!: number;
/*

  // IngredientInSet belongsTo Ingredient via ingredient_id
  ingredient!: IngredientEntity;
  getIngredient!: Sequelize.BelongsToGetAssociationMixin<IngredientEntity>;
  setIngredient!: Sequelize.BelongsToSetAssociationMixin<IngredientEntity, IngredientId>;
  createIngredient!: Sequelize.BelongsToCreateAssociationMixin<IngredientEntity>;

  // IngredientInSet belongsTo IngredientSet via ingredient_set_id
  ingredient_set!: IngredientSetEntity;
  getIngredient_set!: Sequelize.BelongsToGetAssociationMixin<IngredientSetEntity>;
  setIngredient_set!: Sequelize.BelongsToSetAssociationMixin<IngredientSetEntity, IngredientSetId>;
  createIngredient_set!: Sequelize.BelongsToCreateAssociationMixin<IngredientSetEntity>;
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof IngredientInSetEntity {
    IngredientInSetEntity.init({
      ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ingredient',
          key: 'id'
        },
        unique: 'unq_ingredient_in_set'
      },
      ingredient_set_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ingredient_set',
          key: 'id'
        },
        unique: 'unq_ingredient_in_set'
      }
    }, {
      sequelize,
      tableName: 'ingredient_in_set',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'unq_ingredient_in_set',
          unique: true,
          fields: [
            { name: 'ingredient_id' },
            { name: 'ingredient_set_id' },
          ]
        },
      ]
    });
    return IngredientInSetEntity;
  }
}
