import type { Model, ModelType, Sequelize } from 'sequelize';
import type { DimensionAttributes, DimensionCreationAttributes } from './Dimension.entity';
import { DimensionEntity } from './Dimension.entity';
import type { DishAttributes, DishCreationAttributes } from './Dish.entity';
import { DishEntity } from './Dish.entity';
import type { DishInMenuAttributes, DishInMenuCreationAttributes } from './DishInMenu.entity';
import { DishInMenuEntity } from './DishInMenu.entity';
import type { DishInSetAttributes, DishInSetCreationAttributes } from './DishInSet.entity';
import { DishInSetEntity } from './DishInSet.entity';
import type { DishSetAttributes, DishSetCreationAttributes } from './DishSet.entity';
import { DishSetEntity } from './DishSet.entity';
import type { ImageAttributes, ImageCreationAttributes } from './Image.entity';
import { ImageEntity } from './Image.entity';
import type { IngredientAttributes, IngredientCreationAttributes } from './Ingredient.entity';
import { IngredientEntity } from './Ingredient.entity';
import type { IngredientInRecipeAttributes, IngredientInRecipeCreationAttributes } from './IngredientInRecipe.entity';
import { IngredientInRecipeEntity } from './IngredientInRecipe.entity';
import type { IngredientInSetAttributes, IngredientInSetCreationAttributes } from './IngredientInSet.entity';
import { IngredientInSetEntity } from './IngredientInSet.entity';
import type { IngredientSetAttributes, IngredientSetCreationAttributes } from './IngredientSet.entity';
import { IngredientSetEntity } from './IngredientSet.entity';
import type { MenuAttributes, MenuCreationAttributes } from './Menu.entity';
import { MenuEntity } from './Menu.entity';
import type { MenuInScheduleAttributes, MenuInScheduleCreationAttributes } from './MenuInSchedule.entity';
import { MenuInScheduleEntity } from './MenuInSchedule.entity';
import type { RecipeAttributes, RecipeCreationAttributes } from './Recipe.entity';
import { RecipeEntity } from './Recipe.entity';
import type { RecipeImageAttributes, RecipeImageCreationAttributes } from './RecipeImage.entity';
import { RecipeImageEntity } from './RecipeImage.entity';
import type { RoleAttributes, RoleCreationAttributes } from './Role.entity';
import { RoleEntity } from './Role.entity';
import type { ScheduleAttributes, ScheduleCreationAttributes } from './Schedule.entity';
import { ScheduleEntity } from './Schedule.entity';
import type { UserRoleAttributes, UserRoleCreationAttributes } from './UserRole.entity';
import { UserRoleEntity } from './UserRole.entity';
import type { UsersAttributes, UserCreationAttributes } from './UserEntity';
import { UserEntity } from './UserEntity';

export {
  DimensionEntity,
  DishEntity,
  DishInMenuEntity,
  DishInSetEntity,
  DishSetEntity,
  ImageEntity,
  IngredientEntity,
  IngredientInRecipeEntity,
  IngredientInSetEntity,
  IngredientSetEntity,
  MenuEntity,
  MenuInScheduleEntity,
  RecipeEntity,
  RecipeImageEntity,
  RoleEntity,
  ScheduleEntity,
  UserRoleEntity,
  UserEntity,
};

export type {
  DimensionAttributes,
  DimensionCreationAttributes,
  DishAttributes,
  DishCreationAttributes,
  DishInMenuAttributes,
  DishInMenuCreationAttributes,
  DishInSetAttributes,
  DishInSetCreationAttributes,
  DishSetAttributes,
  DishSetCreationAttributes,
  ImageAttributes,
  ImageCreationAttributes,
  IngredientAttributes,
  IngredientCreationAttributes,
  IngredientInRecipeAttributes,
  IngredientInRecipeCreationAttributes,
  IngredientInSetAttributes,
  IngredientInSetCreationAttributes,
  IngredientSetAttributes,
  IngredientSetCreationAttributes,
  MenuAttributes,
  MenuCreationAttributes,
  MenuInScheduleAttributes,
  MenuInScheduleCreationAttributes,
  RecipeAttributes,
  RecipeCreationAttributes,
  RecipeImageAttributes,
  RecipeImageCreationAttributes,
  RoleAttributes,
  RoleCreationAttributes,
  ScheduleAttributes,
  ScheduleCreationAttributes,
  UserRoleAttributes,
  UserRoleCreationAttributes,
  UsersAttributes,
  UserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  DishEntity.initModel(sequelize);
  MenuEntity.initModel(sequelize);
  DishInMenuEntity.initModel(sequelize);

  DimensionEntity.initModel(sequelize);
  DishInSetEntity.initModel(sequelize);
  DishSetEntity.initModel(sequelize);
  ImageEntity.initModel(sequelize);
  IngredientEntity.initModel(sequelize);
  IngredientInRecipeEntity.initModel(sequelize);
  IngredientInSetEntity.initModel(sequelize);
  IngredientSetEntity.initModel(sequelize);
  MenuInScheduleEntity.initModel(sequelize);
  RecipeEntity.initModel(sequelize);
  RecipeImageEntity.initModel(sequelize);
  RoleEntity.initModel(sequelize);
  ScheduleEntity.initModel(sequelize);
  UserRoleEntity.initModel(sequelize);
  UserEntity.initModel(sequelize);

  // MenuEntity.hasMany(DishInMenuEntity, {
  //   foreignKey: nameof<DishInMenuEntity>(o => o.menu_id),
  // });
  // DishInMenuEntity.belongsTo(MenuEntity);
  //
  // DishEntity.hasMany(DishInMenuEntity, {
  //   foreignKey: nameof<DishInMenuEntity>(o => o.dish_id),
  // });
  // DishInMenuEntity.belongsTo(DishEntity);


  MenuEntity.belongsToMany(DishEntity, {
    through: DishInMenuEntity as ModelType,
    foreignKey: nameof<DishInMenuEntity>(o => o.menu_id),
    as: 'dishes'
  });
  DishEntity.belongsToMany(MenuEntity, {
    through: DishInMenuEntity as ModelType,
    foreignKey: nameof<DishInMenuEntity>(o => o.dish_id),
    as: 'menus',
  });

  DishInMenuEntity.belongsTo(MenuEntity, {
    foreignKey: nameof<DishInMenuEntity>(o => o.menu_id),
  });
  DishInMenuEntity.belongsTo(DishEntity, {
    foreignKey: nameof<DishInMenuEntity>(o => o.dish_id)
  });

  MenuEntity.belongsTo(UserEntity, { as: 'author', foreignKey: 'author_id' });
  UserEntity.hasMany(MenuEntity, { as: 'menus', foreignKey: 'author_id' });

  // IngredientEntity.belongsToMany(RecipeEntity, {
  //   as: 'recipes',
  //   through: IngredientInRecipeEntity as typeof Model,
  //   foreignKey: 'ingredient_id',
  //   otherKey: 'recipe_id'
  // });
  // RecipeEntity.belongsToMany(IngredientEntity, {
  //   as: 'ingredients',
  //   through: IngredientInRecipeEntity as typeof Model,
  //   foreignKey: 'recipe_id',
  //   otherKey: 'ingredient_id'
  // });
  // RoleEntity.belongsToMany(UserEntity, {
  //   as: 'users',
  //   through: UserRoleEntity as typeof Model,
  //   foreignKey: 'role_id',
  //   otherKey: 'user_id'
  // });
  // UserEntity.belongsToMany(RoleEntity, {
  //   as: 'roles',
  //   through: UserRoleEntity as typeof Model,
  //   foreignKey: 'user_id',
  //   otherKey: 'role_id'
  // });
  // IngredientInRecipeEntity.belongsTo(DimensionEntity, { as: 'dimension', foreignKey: 'dimension_id' });
  // DimensionEntity.hasMany(IngredientInRecipeEntity, { as: 'ingredient_in_recipes', foreignKey: 'dimension_id' });
  // DishInMenuEntity.belongsTo(DishEntity, { as: 'dish', foreignKey: 'dish_id' });
  // DishEntity.hasMany(DishInMenuEntity, { as: 'dish_in_menus', foreignKey: 'dish_id' });
  // DishInSetEntity.belongsTo(DishEntity, { as: 'dish', foreignKey: 'dish_id' });
  // DishEntity.hasMany(DishInSetEntity, { as: 'dish_in_sets', foreignKey: 'dish_id' });
  // RecipeEntity.belongsTo(DishEntity, { as: 'dish', foreignKey: 'dish_id' });
  // DishEntity.hasMany(RecipeEntity, { as: 'recipes', foreignKey: 'dish_id' });
  // DishInSetEntity.belongsTo(DishSetEntity, { as: 'dish_set', foreignKey: 'dish_set_id' });
  // DishSetEntity.hasMany(DishInSetEntity, { as: 'dish_in_sets', foreignKey: 'dish_set_id' });
  // DishEntity.belongsTo(ImageEntity, { as: 'image', foreignKey: 'image_id' });
  // ImageEntity.hasMany(DishEntity, { as: 'dishes', foreignKey: 'image_id' });
  // DishSetEntity.belongsTo(ImageEntity, { as: 'image', foreignKey: 'image_id' });
  // ImageEntity.hasMany(DishSetEntity, { as: 'dish_sets', foreignKey: 'image_id' });
  // IngredientEntity.belongsTo(ImageEntity, { as: 'image', foreignKey: 'image_id' });
  // ImageEntity.hasMany(IngredientEntity, { as: 'ingredients', foreignKey: 'image_id' });
  // IngredientSetEntity.belongsTo(ImageEntity, { as: 'image', foreignKey: 'image_id' });
  // ImageEntity.hasMany(IngredientSetEntity, { as: 'ingredient_sets', foreignKey: 'image_id' });
  // RecipeEntity.belongsTo(ImageEntity, { as: 'image', foreignKey: 'image_id' });
  // ImageEntity.hasMany(RecipeEntity, { as: 'recipes', foreignKey: 'image_id' });
  // RecipeImageEntity.belongsTo(ImageEntity, { as: 'image', foreignKey: 'image_id' });
  // ImageEntity.hasMany(RecipeImageEntity, { as: 'recipe_images', foreignKey: 'image_id' });
  // IngredientInRecipeEntity.belongsTo(IngredientEntity, { as: 'ingredient', foreignKey: 'ingredient_id' });
  // IngredientEntity.hasMany(IngredientInRecipeEntity, { as: 'ingredient_in_recipes', foreignKey: 'ingredient_id' });
  // IngredientInSetEntity.belongsTo(IngredientEntity, { as: 'ingredient', foreignKey: 'ingredient_id' });
  // IngredientEntity.hasMany(IngredientInSetEntity, { as: 'ingredient_in_sets', foreignKey: 'ingredient_id' });
  // IngredientInSetEntity.belongsTo(IngredientSetEntity, { as: 'ingredient_set', foreignKey: 'ingredient_set_id' });
  // IngredientSetEntity.hasMany(IngredientInSetEntity, { as: 'ingredient_in_sets', foreignKey: 'ingredient_set_id' });
  // DishInMenuEntity.belongsTo(MenuEntity, { as: 'menu', foreignKey: 'menu_id' });
  // MenuEntity.hasMany(DishInMenuEntity, { as: 'dish_in_menus', foreignKey: 'menu_id' });
  // MenuInScheduleEntity.belongsTo(MenuEntity, { as: 'menu', foreignKey: 'menu_id' });
  // MenuEntity.hasMany(MenuInScheduleEntity, { as: 'menu_in_schedules', foreignKey: 'menu_id' });
  // IngredientInRecipeEntity.belongsTo(RecipeEntity, { as: 'recipe', foreignKey: 'recipe_id' });
  // RecipeEntity.hasMany(IngredientInRecipeEntity, { as: 'ingredient_in_recipes', foreignKey: 'recipe_id' });
  // RecipeImageEntity.belongsTo(RecipeEntity, { as: 'recipe', foreignKey: 'recipe_id' });
  // RecipeEntity.hasMany(RecipeImageEntity, { as: 'recipe_images', foreignKey: 'recipe_id' });
  // UserRoleEntity.belongsTo(RoleEntity, { as: 'role', foreignKey: 'role_id' });
  // RoleEntity.hasMany(UserRoleEntity, { as: 'user_roles', foreignKey: 'role_id' });
  // MenuInScheduleEntity.belongsTo(ScheduleEntity, { as: 'schedule', foreignKey: 'schedule_id' });
  // ScheduleEntity.hasMany(MenuInScheduleEntity, { as: 'menu_in_schedules', foreignKey: 'schedule_id' });
  // MenuEntity.belongsTo(UserEntity, { as: 'author', foreignKey: 'author_id' });
  // UserEntity.hasMany(MenuEntity, { as: 'menus', foreignKey: 'author_id' });
  // ScheduleEntity.belongsTo(UserEntity, { as: 'author', foreignKey: 'author_id' });
  // UserEntity.hasMany(ScheduleEntity, { as: 'schedules', foreignKey: 'author_id' });
  // UserRoleEntity.belongsTo(UserEntity, { as: 'user', foreignKey: 'user_id' });
  // UserEntity.hasMany(UserRoleEntity, { as: 'user_roles', foreignKey: 'user_id' });

  return {
    Dimension: DimensionEntity,
    Dish: DishEntity,
    DishInMenu: DishInMenuEntity,
    DishInSet: DishInSetEntity,
    DishSet: DishSetEntity,
    Image: ImageEntity,
    Ingredient: IngredientEntity,
    IngredientInRecipe: IngredientInRecipeEntity,
    IngredientInSet: IngredientInSetEntity,
    IngredientSet: IngredientSetEntity,
    Menu: MenuEntity,
    MenuInSchedule: MenuInScheduleEntity,
    Recipe: RecipeEntity,
    RecipeImage: RecipeImageEntity,
    Role: RoleEntity,
    Schedule: ScheduleEntity,
    UserRole: UserRoleEntity,
    Users: UserEntity,
  };
}
