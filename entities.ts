type ID = string;

interface Entity {
	id: ID;
}

interface Image extends Entity {
	content: string;
}

interface WithImage {
	image_id?: Image['id'];
}

interface Set extends Entity, WithImage {
	name: string;
}

interface IngredientSet extends Set {}

interface Ingredient extends Entity, WithImage {
	name: string;
}

interface IngredientInSet {
	ingredient_id: Ingredient['id'];
	ingredient_set_id: IngredientSet['id'];
}

interface Dimension extends Entity {
	name: string;
}

interface IngredientInRecipe {
	recipe_id: Recipe['id'];
	ingredient_id: Ingredient['id'];
	dimension_id?: Dimension['id'];
	size?: number;
}

interface Recipe extends Entity, WithImage {
	name: string;
	dish_id: Dish['id'];
	description?: string;
}

interface RecipeImage extends WithImage {
	recipe_id: Recipe['id'];
}

interface Dish extends Entity, WithImage {
	name: string;
	description?: string;
}

interface DisInSet {
	dish_id: Dish['id'];
	dish_set_id: DishSet['id'];
}

interface DishSet extends Set {}

interface DishInMenu {
	menu_id: Menu['id'];
	dish_id: Dish['id'];
	order_number: number;
}

interface Menu extends Entity {
	name: string;
	create_date: string;
	last_update: string;
	author_id: User['id'];
}

interface MenuInSchedile {
	schedule_id: Schedule['id'];
	menu_id: Menu['id'];
	date: string;
}

interface Schedule extends Entity, WithImage {
	author_id: User['id'];
	name?: string;
}

interface User extends Entity {
	name: string;
	email: string;
	password: string;
}

interface UserRole {
	user_id: User['id'];
	role_id: Role['id'];
}

interface Role extends Entity {
	name: string;
}

export type {
	Image as ImageEntity,
	IngredientSet as IngredientSetEntity,
	Ingredient as IngredientEntity,
	IngredientInSet as IngredientInSetEntity,
	Dimension as DimensionEntity,
	IngredientInRecipe as IngredientInRecipeEntity,
	Recipe as RecipeEntity,
	RecipeImage as RecipeImageEntity,
	Dish as DishEntity,
	DisInSet as DisInSetEntity,
	DishSet as DishSetEntity,
	DishInMenu as DishInMenuEntity,
	Menu as MenuEntity,
	MenuInSchedile as MenuInSchedileEntity,
	Schedule as ScheduleEntity,
	User as UserEntity,
	UserRole as UserRoleEntity,
	Role as RoleEntity,

	WithImage,
};
