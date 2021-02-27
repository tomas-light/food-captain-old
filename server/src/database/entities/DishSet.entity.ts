import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { DishInSetEntity } from './DishInSet.entity';
import type { ImageEntity, ImageId } from './Image.entity';

export interface DishSetAttributes {
  id: number;
  name: string;
  image_id?: number;
}

export type DishSetPk = 'id';
export type DishSetId = DishSetEntity[DishSetPk];
export type DishSetCreationAttributes = Optional<DishSetAttributes, DishSetPk>;

export class DishSetEntity extends Model<DishSetAttributes, DishSetCreationAttributes> implements DishSetAttributes {
  id!: number;
  name!: string;
  image_id?: number;
/*

  // DishSet hasMany DishInSet via dish_set_id
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
  // DishSet belongsTo Image via image_id
  image!: ImageEntity;
  getImage!: Sequelize.BelongsToGetAssociationMixin<ImageEntity>;
  setImage!: Sequelize.BelongsToSetAssociationMixin<ImageEntity, ImageId>;
  createImage!: Sequelize.BelongsToCreateAssociationMixin<ImageEntity>;
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof DishSetEntity {
    DishSetEntity.init({
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
      tableName: 'dish_set',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_dish_set_id',
          unique: true,
          fields: [
            { name: 'id' },
          ]
        },
      ]
    });
    return DishSetEntity;
  }
}
