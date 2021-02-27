import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { DimensionEntity, DimensionId } from './Dimension.entity';
import type { IngredientEntity, IngredientId } from './Ingredient.entity';
import type { RecipeEntity, RecipeId } from './Recipe.entity';

export interface IngredientInRecipeAttributes {
  recipe_id: number;
  ingredient_id: number;
  dimension_id?: number;
  size?: number;
}

export type IngredientInRecipePk = 'recipe_id' | 'ingredient_id';
export type IngredientInRecipeId = IngredientInRecipeEntity[IngredientInRecipePk];
export type IngredientInRecipeCreationAttributes = Optional<IngredientInRecipeAttributes, IngredientInRecipePk>;

export class IngredientInRecipeEntity extends Model<IngredientInRecipeAttributes, IngredientInRecipeCreationAttributes> implements IngredientInRecipeAttributes {
  recipe_id!: number;
  ingredient_id!: number;
  dimension_id?: number;
  size?: number;
/*

  // IngredientInRecipe belongsTo Dimension via dimension_id
  dimension!: DimensionEntity;
  getDimension!: Sequelize.BelongsToGetAssociationMixin<DimensionEntity>;
  setDimension!: Sequelize.BelongsToSetAssociationMixin<DimensionEntity, DimensionId>;
  createDimension!: Sequelize.BelongsToCreateAssociationMixin<DimensionEntity>;

  // IngredientInRecipe belongsTo Ingredient via ingredient_id
  ingredient!: IngredientEntity;
  getIngredient!: Sequelize.BelongsToGetAssociationMixin<IngredientEntity>;
  setIngredient!: Sequelize.BelongsToSetAssociationMixin<IngredientEntity, IngredientId>;
  createIngredient!: Sequelize.BelongsToCreateAssociationMixin<IngredientEntity>;

  // IngredientInRecipe belongsTo Recipe via recipe_id
  recipe!: RecipeEntity;
  getRecipe!: Sequelize.BelongsToGetAssociationMixin<RecipeEntity>;
  setRecipe!: Sequelize.BelongsToSetAssociationMixin<RecipeEntity, RecipeId>;
  createRecipe!: Sequelize.BelongsToCreateAssociationMixin<RecipeEntity>;
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof IngredientInRecipeEntity {
    IngredientInRecipeEntity.init({
      recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'recipe',
          key: 'id'
        }
      },
      ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'ingredient',
          key: 'id'
        }
      },
      dimension_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'dimension',
          key: 'id'
        }
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    }, {
      sequelize,
      tableName: 'ingredient_in_recipe',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_recipe_ingredient',
          unique: true,
          fields: [
            { name: 'recipe_id' },
            { name: 'ingredient_id' },
          ]
        },
      ]
    });
    return IngredientInRecipeEntity;
  }
}
