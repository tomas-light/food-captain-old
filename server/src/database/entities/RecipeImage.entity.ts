import Sequelize, { DataTypes, Model } from 'sequelize';
import type { ImageEntity, ImageId } from './Image.entity';
import type { RecipeEntity, RecipeId } from './Recipe.entity';

export interface RecipeImageAttributes {
  recipe_id: number;
  image_id: number;
}

export type RecipeImageCreationAttributes = RecipeImageAttributes;

export class RecipeImageEntity extends Model<RecipeImageAttributes, RecipeImageCreationAttributes> implements RecipeImageAttributes {
  recipe_id!: number;
  image_id!: number;

/*
  // RecipeImage belongsTo Image via image_id
  image!: ImageEntity;
  getImage!: Sequelize.BelongsToGetAssociationMixin<ImageEntity>;
  setImage!: Sequelize.BelongsToSetAssociationMixin<ImageEntity, ImageId>;
  createImage!: Sequelize.BelongsToCreateAssociationMixin<ImageEntity>;

  // RecipeImage belongsTo Recipe via recipe_id
  recipe!: RecipeEntity;
  getRecipe!: Sequelize.BelongsToGetAssociationMixin<RecipeEntity>;
  setRecipe!: Sequelize.BelongsToSetAssociationMixin<RecipeEntity, RecipeId>;
  createRecipe!: Sequelize.BelongsToCreateAssociationMixin<RecipeEntity>;
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof RecipeImageEntity {
    RecipeImageEntity.init({
      recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'recipe',
          key: 'id'
        },
        unique: 'unq_recipe_image'
      },
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'image',
          key: 'id'
        },
        unique: 'unq_recipe_image'
      }
    }, {
      sequelize,
      tableName: 'recipe_image',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'unq_recipe_image',
          unique: true,
          fields: [
            { name: 'recipe_id' },
            { name: 'image_id' },
          ]
        },
      ]
    });
    return RecipeImageEntity;
  }
}
