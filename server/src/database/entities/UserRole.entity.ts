import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { RoleEntity, RoleId } from './Role.entity';
import type { UserEntity, UserId } from './UserEntity';

export interface UserRoleAttributes {
  user_id: number;
  role_id: number;
}

export type UserRolePk = 'user_id' | 'role_id';
export type UserRoleId = UserRoleEntity[UserRolePk];
export type UserRoleCreationAttributes = Optional<UserRoleAttributes, UserRolePk>;

export class UserRoleEntity extends Model<UserRoleAttributes, UserRoleCreationAttributes> implements UserRoleAttributes {
  user_id!: number;
  role_id!: number;

/*
  // UserRole belongsTo Role via role_id
  role!: RoleEntity;
  getRole!: Sequelize.BelongsToGetAssociationMixin<RoleEntity>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<RoleEntity, RoleId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<RoleEntity>;

  // UserRole belongsTo Users via user_id
  user!: UserEntity;
  getUser!: Sequelize.BelongsToGetAssociationMixin<UserEntity>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<UserEntity, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<UserEntity>;
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof UserRoleEntity {
    UserRoleEntity.init({
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'role',
          key: 'id'
        }
      }
    }, {
      sequelize,
      tableName: 'user_role',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_user_role',
          unique: true,
          fields: [
            { name: 'user_id' },
            { name: 'role_id' },
          ]
        },
      ]
    });
    return UserRoleEntity;
  }
}
