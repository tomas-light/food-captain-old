import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { DishInMenuEntity } from './DishInMenu.entity';
import type { DishInSetEntity } from './DishInSet.entity';
import type { ImageEntity, ImageId } from './Image.entity';
import type { RecipeEntity, RecipeId } from './Recipe.entity';

export interface DishAttributes {
  id: number;
  name: string;
  description?: string;
  image_id?: number;
}

export type DishPk = 'id';
export type DishId = DishEntity[DishPk];
export type DishCreationAttributes = Optional<DishAttributes, DishPk>;

export class DishEntity extends Model<DishAttributes, DishCreationAttributes> implements DishAttributes {
  id!: number;
  name!: string;
  description?: string;
  image_id?: number;
/*

  // Dish hasMany DishInMenu via dish_id
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

  // Dish hasMany DishInSet via dish_id
  dish_in_sets!: DishInSetEntity[];
  getDish_in_sets!: Sequelize.HasManyGetAssociationsMixin<DishInSetEntity>;
  setDish_in_sets!: Sequelize.HasManySetAssociationsMixin<DishInSetEntity, number>;
  addDish_in_set!: Sequelize.HasManyAddAssociationMixin<DishInSetEntity, number>;
  addDish_in_sets!: Sequelize.HasManyAddAssociationsMixin<DishInSetEntity, number>;
  createDish_in_set!: Sequelize.HasManyCreateAssociationMixin<DishInSetEntity>;
  removeDish_in_set!: Sequelize.HasManyRemoveAssociationMixin<DishInSetEntity, number>;
  removeDish_in_sets!: Sequelize.HasManyRemoveAssociationsMixin<DishInSetEntity, number>;
  hasDish_in_set!: Sequelize.HasManyHasAssociationMixin<DishInSetEntity, number>;
  hasDish_in_sets!: Sequelize.HasManyHasAssociationsMixin<DishInSetEntity, number>;
  countDish_in_sets!: Sequelize.HasManyCountAssociationsMixin;

  // Dish hasMany Recipe via dish_id
  recipes!: RecipeEntity[];
  getRecipes!: Sequelize.HasManyGetAssociationsMixin<RecipeEntity>;
  setRecipes!: Sequelize.HasManySetAssociationsMixin<RecipeEntity, RecipeId>;
  addRecipe!: Sequelize.HasManyAddAssociationMixin<RecipeEntity, RecipeId>;
  addRecipes!: Sequelize.HasManyAddAssociationsMixin<RecipeEntity, RecipeId>;
  createRecipe!: Sequelize.HasManyCreateAssociationMixin<RecipeEntity>;
  removeRecipe!: Sequelize.HasManyRemoveAssociationMixin<RecipeEntity, RecipeId>;
  removeRecipes!: Sequelize.HasManyRemoveAssociationsMixin<RecipeEntity, RecipeId>;
  hasRecipe!: Sequelize.HasManyHasAssociationMixin<RecipeEntity, RecipeId>;
  hasRecipes!: Sequelize.HasManyHasAssociationsMixin<RecipeEntity, RecipeId>;
  countRecipes!: Sequelize.HasManyCountAssociationsMixin;

  // Dish belongsTo Image via image_id
  image!: ImageEntity;
  getImage!: Sequelize.BelongsToGetAssociationMixin<ImageEntity>;
  setImage!: Sequelize.BelongsToSetAssociationMixin<ImageEntity, ImageId>;
  createImage!: Sequelize.BelongsToCreateAssociationMixin<ImageEntity>;
*/
  menu?: DishInMenuEntity;
  menus?: DishInMenuEntity[];

  // set?: DishInSetEntity;
  sets?: DishInSetEntity[];

  image?: ImageEntity;

  recipe?: RecipeEntity;
  recipes?: RecipeEntity[];

  static initModel(sequelize: Sequelize.Sequelize) {
    DishEntity.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
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
      tableName: 'dish',
      // schema: 'public',
      timestamps: false,
      // indexes: [
      //   {
      //     name: 'pk_dish_id',
      //     unique: true,
      //     fields: [
      //       { name: 'id' },
      //     ]
      //   },
      // ]
    });
  }
}
