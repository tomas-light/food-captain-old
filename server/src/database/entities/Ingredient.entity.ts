import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { ImageEntity, ImageId } from './Image.entity';
import type { IngredientInRecipeEntity, IngredientInRecipeId } from './IngredientInRecipe.entity';
import type { IngredientInSetEntity } from './IngredientInSet.entity';
import type { RecipeEntity, RecipeId } from './Recipe.entity';

export interface IngredientAttributes {
  id: number;
  name?: string;
  image_id?: number;
}

export type IngredientPk = 'id';
export type IngredientId = IngredientEntity[IngredientPk];
export type IngredientCreationAttributes = Optional<IngredientAttributes, IngredientPk>;

export class IngredientEntity extends Model<IngredientAttributes, IngredientCreationAttributes> implements IngredientAttributes {
  id!: number;
  name?: string;
  image_id?: number;
/*

  // Ingredient belongsTo Image via image_id
  image!: ImageEntity;
  getImage!: Sequelize.BelongsToGetAssociationMixin<ImageEntity>;
  setImage!: Sequelize.BelongsToSetAssociationMixin<ImageEntity, ImageId>;
  createImage!: Sequelize.BelongsToCreateAssociationMixin<ImageEntity>;

  // Ingredient hasMany IngredientInRecipe via ingredient_id
  ingredient_in_recipes!: IngredientInRecipeEntity[];
  getIngredient_in_recipes!: Sequelize.HasManyGetAssociationsMixin<IngredientInRecipeEntity>;
  setIngredient_in_recipes!: Sequelize.HasManySetAssociationsMixin<IngredientInRecipeEntity, IngredientInRecipeId>;
  addIngredient_in_recipe!: Sequelize.HasManyAddAssociationMixin<IngredientInRecipeEntity, IngredientInRecipeId>;
  addIngredient_in_recipes!: Sequelize.HasManyAddAssociationsMixin<IngredientInRecipeEntity, IngredientInRecipeId>;
  createIngredient_in_recipe!: Sequelize.HasManyCreateAssociationMixin<IngredientInRecipeEntity>;
  removeIngredient_in_recipe!: Sequelize.HasManyRemoveAssociationMixin<IngredientInRecipeEntity, IngredientInRecipeId>;
  removeIngredient_in_recipes!: Sequelize.HasManyRemoveAssociationsMixin<IngredientInRecipeEntity, IngredientInRecipeId>;
  hasIngredient_in_recipe!: Sequelize.HasManyHasAssociationMixin<IngredientInRecipeEntity, IngredientInRecipeId>;
  hasIngredient_in_recipes!: Sequelize.HasManyHasAssociationsMixin<IngredientInRecipeEntity, IngredientInRecipeId>;
  countIngredient_in_recipes!: Sequelize.HasManyCountAssociationsMixin;

  // Ingredient hasMany IngredientInSet via ingredient_id
  ingredient_in_sets!: IngredientInSetEntity[];
  getIngredient_in_sets!: Sequelize.HasManyGetAssociationsMixin<IngredientInSetEntity>;
  setIngredient_in_sets!: Sequelize.HasManySetAssociationsMixin<IngredientInSetEntity, number>;
  addIngredient_in_set!: Sequelize.HasManyAddAssociationMixin<IngredientInSetEntity, number>;
  addIngredient_in_sets!: Sequelize.HasManyAddAssociationsMixin<IngredientInSetEntity, number>;
  createIngredient_in_set!: Sequelize.HasManyCreateAssociationMixin<IngredientInSetEntity>;
  removeIngredient_in_set!: Sequelize.HasManyRemoveAssociationMixin<IngredientInSetEntity, number>;
  removeIngredient_in_sets!: Sequelize.HasManyRemoveAssociationsMixin<IngredientInSetEntity, number>;
  hasIngredient_in_set!: Sequelize.HasManyHasAssociationMixin<IngredientInSetEntity, number>;
  hasIngredient_in_sets!: Sequelize.HasManyHasAssociationsMixin<IngredientInSetEntity, number>;
  countIngredient_in_sets!: Sequelize.HasManyCountAssociationsMixin;

  // Ingredient belongsToMany Recipe via ingredient_id and recipe_id
  recipes!: RecipeEntity[];
  getRecipes!: Sequelize.BelongsToManyGetAssociationsMixin<RecipeEntity>;
  setRecipes!: Sequelize.BelongsToManySetAssociationsMixin<RecipeEntity, RecipeId>;
  addRecipe!: Sequelize.BelongsToManyAddAssociationMixin<RecipeEntity, RecipeId>;
  addRecipes!: Sequelize.BelongsToManyAddAssociationsMixin<RecipeEntity, RecipeId>;
  createRecipe!: Sequelize.BelongsToManyCreateAssociationMixin<RecipeEntity>;
  removeRecipe!: Sequelize.BelongsToManyRemoveAssociationMixin<RecipeEntity, RecipeId>;
  removeRecipes!: Sequelize.BelongsToManyRemoveAssociationsMixin<RecipeEntity, RecipeId>;
  hasRecipe!: Sequelize.BelongsToManyHasAssociationMixin<RecipeEntity, RecipeId>;
  hasRecipes!: Sequelize.BelongsToManyHasAssociationsMixin<RecipeEntity, RecipeId>;
  countRecipes!: Sequelize.BelongsToManyCountAssociationsMixin;
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof IngredientEntity {
    IngredientEntity.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: true
      },
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'image',
          key: 'id'
        }
      }
    }, {
      sequelize,
      tableName: 'ingredient',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_ingredient_id',
          unique: true,
          fields: [
            { name: 'id' },
          ]
        },
      ]
    });
    return IngredientEntity;
  }
}
