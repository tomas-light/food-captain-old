import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { MenuEntity, MenuId } from './Menu.entity';
import type { RoleEntity, RoleId } from './Role.entity';
import type { ScheduleEntity, ScheduleId } from './Schedule.entity';
import type { UserRoleEntity, UserRoleId } from './UserRole.entity';

export interface UsersAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type UserPk = 'id';
export type UserId = UserEntity[UserPk];
export type UserCreationAttributes = Optional<UsersAttributes, UserPk>;

export class UserEntity extends Model<UsersAttributes, UserCreationAttributes> implements UsersAttributes {
  id!: number;
  name!: string;
  email!: string;
  password!: string;

/*
  // Users hasMany Menu via author_id
  menus!: MenuEntity[];
  getMenus!: Sequelize.HasManyGetAssociationsMixin<MenuEntity>;
  setMenus!: Sequelize.HasManySetAssociationsMixin<MenuEntity, MenuId>;
  addMenu!: Sequelize.HasManyAddAssociationMixin<MenuEntity, MenuId>;
  addMenus!: Sequelize.HasManyAddAssociationsMixin<MenuEntity, MenuId>;
  createMenu!: Sequelize.HasManyCreateAssociationMixin<MenuEntity>;
  removeMenu!: Sequelize.HasManyRemoveAssociationMixin<MenuEntity, MenuId>;
  removeMenus!: Sequelize.HasManyRemoveAssociationsMixin<MenuEntity, MenuId>;
  hasMenu!: Sequelize.HasManyHasAssociationMixin<MenuEntity, MenuId>;
  hasMenus!: Sequelize.HasManyHasAssociationsMixin<MenuEntity, MenuId>;
  countMenus!: Sequelize.HasManyCountAssociationsMixin;

  // Users belongsToMany Role via user_id and role_id
  roles!: RoleEntity[];
  getRoles!: Sequelize.BelongsToManyGetAssociationsMixin<RoleEntity>;
  setRoles!: Sequelize.BelongsToManySetAssociationsMixin<RoleEntity, RoleId>;
  addRole!: Sequelize.BelongsToManyAddAssociationMixin<RoleEntity, RoleId>;
  addRoles!: Sequelize.BelongsToManyAddAssociationsMixin<RoleEntity, RoleId>;
  createRole!: Sequelize.BelongsToManyCreateAssociationMixin<RoleEntity>;
  removeRole!: Sequelize.BelongsToManyRemoveAssociationMixin<RoleEntity, RoleId>;
  removeRoles!: Sequelize.BelongsToManyRemoveAssociationsMixin<RoleEntity, RoleId>;
  hasRole!: Sequelize.BelongsToManyHasAssociationMixin<RoleEntity, RoleId>;
  hasRoles!: Sequelize.BelongsToManyHasAssociationsMixin<RoleEntity, RoleId>;
  countRoles!: Sequelize.BelongsToManyCountAssociationsMixin;

  // Users hasMany Schedule via author_id
  schedules!: ScheduleEntity[];
  getSchedules!: Sequelize.HasManyGetAssociationsMixin<ScheduleEntity>;
  setSchedules!: Sequelize.HasManySetAssociationsMixin<ScheduleEntity, ScheduleId>;
  addSchedule!: Sequelize.HasManyAddAssociationMixin<ScheduleEntity, ScheduleId>;
  addSchedules!: Sequelize.HasManyAddAssociationsMixin<ScheduleEntity, ScheduleId>;
  createSchedule!: Sequelize.HasManyCreateAssociationMixin<ScheduleEntity>;
  removeSchedule!: Sequelize.HasManyRemoveAssociationMixin<ScheduleEntity, ScheduleId>;
  removeSchedules!: Sequelize.HasManyRemoveAssociationsMixin<ScheduleEntity, ScheduleId>;
  hasSchedule!: Sequelize.HasManyHasAssociationMixin<ScheduleEntity, ScheduleId>;
  hasSchedules!: Sequelize.HasManyHasAssociationsMixin<ScheduleEntity, ScheduleId>;
  countSchedules!: Sequelize.HasManyCountAssociationsMixin;

  // Users hasMany UserRole via user_id
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
*/

  static initModel(sequelize: Sequelize.Sequelize): typeof UserEntity {
    UserEntity.init({
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
      email: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'users',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'pk_tbl_id',
          unique: true,
          fields: [
            { name: 'id' },
          ]
        },
      ]
    });
    return UserEntity;
  }
}
