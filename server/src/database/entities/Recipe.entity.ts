import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { DishEntity, DishId } from './Dish.entity';
import type { ImageEntity, ImageId } from './Image.entity';
import type { IngredientEntity, IngredientId } from './Ingredient.entity';
import type { IngredientInRecipeEntity, IngredientInRecipeId } from './IngredientInRecipe.entity';
import type { RecipeImageEntity } from './RecipeImage.entity';

export interface RecipeAttributes {
  id: number;
  name?: string;
  dish_id: number;
  image_id?: number;
  description?: string;
}

export type RecipePk = 'id';
export type RecipeId = RecipeEntity[RecipePk];
export type RecipeCreationAttributes = Optional<RecipeAttributes, RecipePk>;

export class RecipeEntity extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
  id!: number;
  name?: string;
  dish_id!: number;
  image_id?: number;
  description?: string;

/*
  // Recipe belongsTo Dish via dish_id
  dish!: DishEntity;
  getDish!: Sequelize.BelongsToGetAssociationMixin<DishEntity>;
  setDish!: Sequelize.BelongsToSetAssociationMixin<DishEntity, DishId>;
  createDish!: Sequelize.BelongsToCreateAssociationMixin<DishEntity>;

  // Recipe belongsTo Image via image_id
  image!: ImageEntity;
  getImage!: Sequelize.BelongsToGetAssociationMixin<ImageEntity>;
  setImage!: Sequelize.BelongsToSetAssociationMixin<ImageEntity, ImageId>;
  createImage!: Sequelize.BelongsToCreateAssociationMixin<ImageEntity>;

  // Recipe belongsToMany Ingredient via recipe_id and ingredient_id
  ingredients!: IngredientEntity[];
  getIngredients!: Sequelize.BelongsToManyGetAssociationsMixin<IngredientEntity>;
  setIngredients!: Sequelize.BelongsToManySetAssociationsMixin<IngredientEntity, IngredientId>;
  addIngredient!: Sequelize.BelongsToManyAddAssociationMixin<IngredientEntity, IngredientId>;
  addIngredients!: Sequelize.BelongsToManyAddAssociationsMixin<IngredientEntity, IngredientId>;
  createIngredient!: Sequelize.BelongsToManyCreateAssociationMixin<IngredientEntity>;
  removeIngredient!: Sequelize.BelongsToManyRemoveAssociationMixin<IngredientEntity, IngredientId>;
  removeIngredients!: Sequelize.BelongsToManyRemoveAssociationsMixin<IngredientEntity, IngredientId>;
  hasIngredient!: Sequelize.BelongsToManyHasAssociationMixin<IngredientEntity, IngredientId>;
  hasIngredients!: Sequelize.BelongsToManyHasAssociationsMixin<IngredientEntity, IngredientId>;
  countIngredients!: Sequelize.BelongsToManyCountAssociationsMixin;

  // Recipe hasMany IngredientInRecipe via recipe_id
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

  // Recipe hasMany RecipeImage via recipe_id
  recipe_images!: RecipeImageEntity[];
  getRecipe_images!: Sequelize.HasManyGetAssociationsMixin<RecipeImageEntity>;
  setRecipe_images!: Sequelize.HasManySetAssociationsMixin<RecipeImageEntity, number>;
  addRecipe_image!: Sequelize.HasManyAddAssociationMixin<RecipeImageEntity, number>;
  addRecipe_images!: Sequelize.HasManyAddAssociationsMixin<RecipeImageEntity, number>;
  createRecipe_image!: Sequelize.HasManyCreateAssociationMixin<RecipeImageEntity>;
  removeRecipe_image!: Sequelize.HasManyRemoveAssociationMixin<RecipeImageEntity, number>;
  removeRecipe_images!: Sequelize.HasManyRemoveAssociationsMixin<RecipeImageEntity, number>;
  hasRecipe_image!: Sequelize.HasManyHasAssociationMixin<RecipeImageEntity, number>;
  hasRecipe_images!: Sequelize.HasManyHasAssociationsMixin<RecipeImageEntity, number>;
  countRecipe_images!: Sequelize.HasManyCountAssociationsMixin;
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof RecipeEntity {
    RecipeEntity.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      dish_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'dish',
          key: 'id'
        }
      },
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'image',
          key: 'id'
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'recipe',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_recipe_id',
          unique: true,
          fields: [
            { name: 'id' },
          ]
        },
      ]
    });
    return RecipeEntity;
  }
}
