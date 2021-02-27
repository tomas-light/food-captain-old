import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface ImageAttributes {
  id: number;
  content: string;
}

export type ImagePk = 'id';
export type ImageId = ImageEntity[ImagePk];
export type ImageCreationAttributes = Optional<ImageAttributes, ImagePk>;

export class ImageEntity extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
  id!: number;
  content!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof ImageEntity {
    ImageEntity.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'image',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_image_id',
          unique: true,
          fields: [
            { name: 'id' },
          ]
        },
      ]
    });
    return ImageEntity;
  }
}
