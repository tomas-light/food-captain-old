import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { ImageEntity, ImageId } from './Image.entity';
import type { IngredientInSetEntity } from './IngredientInSet.entity';

export interface IngredientSetAttributes {
  id: number;
  name: string;
  image_id?: number;
}

export type IngredientSetPk = 'id';
export type IngredientSetId = IngredientSetEntity[IngredientSetPk];
export type IngredientSetCreationAttributes = Optional<IngredientSetAttributes, IngredientSetPk>;

export class IngredientSetEntity extends Model<IngredientSetAttributes, IngredientSetCreationAttributes> implements IngredientSetAttributes {
  id!: number;
  name!: string;
  image_id?: number;

/*
  // IngredientSet belongsTo Image via image_id
  image!: ImageEntity;
  getImage!: Sequelize.BelongsToGetAssociationMixin<ImageEntity>;
  setImage!: Sequelize.BelongsToSetAssociationMixin<ImageEntity, ImageId>;
  createImage!: Sequelize.BelongsToCreateAssociationMixin<ImageEntity>;

  // IngredientSet hasMany IngredientInSet via ingredient_set_id
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
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof IngredientSetEntity {
    IngredientSetEntity.init({
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
      tableName: 'ingredient_set',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_ingredient_set_id',
          unique: true,
          fields: [
            { name: 'id' },
          ]
        },
      ]
    });
    return IngredientSetEntity;
  }
}
