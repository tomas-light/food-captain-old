import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { UserRoleEntity, UserRoleId } from './UserRole.entity';
import type { UserEntity, UserId } from './UserEntity';

export interface RoleAttributes {
  id: number;
  name: string;
}

export type RolePk = 'id';
export type RoleId = RoleEntity[RolePk];
export type RoleCreationAttributes = Optional<RoleAttributes, RolePk>;

export class RoleEntity extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  id!: number;
  name!: string;

/*
  // Role hasMany UserRole via role_id
  user_roles!: UserRoleEntity[];
  getUser_roles!: Sequelize.HasManyGetAssociationsMixin<UserRoleEntity>;
  setUser_roles!: Sequelize.HasManySetAssociationsMixin<UserRoleEntity, UserRoleId>;
  addUser_role!: Sequelize.HasManyAddAssociationMixin<UserRoleEntity, UserRoleId>;
  addUser_roles!: Sequelize.HasManyAddAssociationsMixin<UserRoleEntity, UserRoleId>;
  createUser_role!: Sequelize.HasManyCreateAssociationMixin<UserRoleEntity>;
  removeUser_role!: Sequelize.HasManyRemoveAssociationMixin<UserRoleEntity, UserRoleId>;
  removeUser_roles!: Sequelize.HasManyRemoveAssociationsMixin<UserRoleEntity, UserRoleId>;
  hasUser_role!: Sequelize.HasManyHasAssociationMixin<UserRoleEntity, UserRoleId>;
  hasUser_roles!: Sequelize.HasManyHasAssociationsMixin<UserRoleEntity, UserRoleId>;
  countUser_roles!: Sequelize.HasManyCountAssociationsMixin;

  // Role belongsToMany Users via role_id and user_id
  users!: UserEntity[];
  getUsers!: Sequelize.BelongsToManyGetAssociationsMixin<UserEntity>;
  setUsers!: Sequelize.BelongsToManySetAssociationsMixin<UserEntity, UserId>;
  addUser!: Sequelize.BelongsToManyAddAssociationMixin<UserEntity, UserId>;
  addUsers!: Sequelize.BelongsToManyAddAssociationsMixin<UserEntity, UserId>;
  createUser!: Sequelize.BelongsToManyCreateAssociationMixin<UserEntity>;
  removeUser!: Sequelize.BelongsToManyRemoveAssociationMixin<UserEntity, UserId>;
  removeUsers!: Sequelize.BelongsToManyRemoveAssociationsMixin<UserEntity, UserId>;
  hasUser!: Sequelize.BelongsToManyHasAssociationMixin<UserEntity, UserId>;
  hasUsers!: Sequelize.BelongsToManyHasAssociationsMixin<UserEntity, UserId>;
  countUsers!: Sequelize.BelongsToManyCountAssociationsMixin;
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof RoleEntity {
    RoleEntity.init({
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
      tableName: 'role',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_tbl_id_0',
          unique: true,
          fields: [
            { name: 'id' },
          ]
        },
      ]
    });
    return RoleEntity;
  }
}
