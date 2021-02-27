import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface DimensionAttributes {
  id: number;
  name: string;
}

export type DimensionPk = 'id';
export type DimensionId = DimensionEntity[DimensionPk];
export type DimensionCreationAttributes = Optional<DimensionAttributes, DimensionPk>;

export class DimensionEntity extends Model<DimensionAttributes, DimensionCreationAttributes> implements DimensionAttributes {
  id!: number;
  name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof DimensionEntity {
    DimensionEntity.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'dimension',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_dimension_id',
          unique: true,
          fields: [
            { name: 'id' },
          ]
        },
      ]
    });
    return DimensionEntity;
  }
}
