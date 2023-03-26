import {
	DimensionEntity,
	DishEntity,
	DishInMenuEntity,
	DishSetEntity,
	DisInSetEntity,
	ImageEntity,
	IngredientEntity,
	IngredientInRecipeEntity,
	IngredientInSetEntity,
	IngredientSetEntity,
	MenuEntity,
	MenuInSchedileEntity,
	RecipeEntity,
	RecipeImageEntity,
	RoleEntity,
	ScheduleEntity,
	UserEntity,
	UserRoleEntity,
} from '../../../../entities';

type ImageTable = {
	key: ImageEntity['id'];
	value: ImageEntity;
};

type IngredientSetTable = {
	key: IngredientSetEntity['id'];
	value: IngredientSetEntity;
};

type IngredientTable = {
	key: IngredientEntity['id'];
	value: IngredientEntity;
};

type IngredientInSetTable = {
	// key: IngredientInSetEntity['id'];
	key: string; // many-to-many keys
	value: IngredientInSetEntity;
};

type DimensionTable = {
	key: DimensionEntity['id'];
	value: DimensionEntity;
};

type IngredientInRecipeTable = {
	// key: IngredientInRecipeEntity['id'];
	key: string; // many-to-many keys
	value: IngredientInRecipeEntity;
};

type RecipeTable = {
	key: RecipeEntity['id'];
	value: RecipeEntity;
};

type RecipeImageTable = {
	// key: RecipeImageEntity['id'];
	key: string; // many-to-many keys
	value: RecipeImageEntity;
};

type DishTable = {
	key: DishEntity['id'];
	value: DishEntity;
};

type DishInSetTable = {
	// key: DisInSetEntity['id'];
	key: string; // many-to-many keys
	value: DisInSetEntity;
};

type DishSetTable = {
	key: DishSetEntity['id'];
	value: DishSetEntity;
};

type DishInMenuTable = {
	// key: DishInMenuEntity['id'];
	key: string; // many-to-many keys
	value: DishInMenuEntity;
};

type MenuTable = {
	key: MenuEntity['id'];
	value: MenuEntity;
};

type MenuInScheduleTable = {
	// key: MenuInSchedileEntity['id'];
	key: string; // many-to-many keys
	value: MenuInSchedileEntity;
};

type ScheduleTable = {
	key: ScheduleEntity['id'];
	value: ScheduleEntity;
};

type UserTable = {
	key: UserEntity['id'];
	value: UserEntity;
};

type UserRoleTable = {
	// key: UserRoleEntity['id'];
	key: string; // many-to-many keys
	value: UserRoleEntity;
};

type RoleTable = {
	key: RoleEntity['id'];
	value: RoleEntity;
};

export type {
	ImageTable,
	IngredientSetTable,
	IngredientTable,
	IngredientInSetTable,
	DimensionTable,
	IngredientInRecipeTable,
	RecipeTable,
	RecipeImageTable,
	DishTable,
	DishInSetTable,
	DishSetTable,
	DishInMenuTable,
	MenuTable,
	MenuInScheduleTable,
	ScheduleTable,
	UserTable,
	UserRoleTable,
	RoleTable,
};
