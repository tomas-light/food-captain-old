import { IDBPDatabase, openDB } from 'idb';
import { DBSchema, StoreKey, StoreNames, StoreValue } from 'idb/build/esm/entry';
import {
	DimensionTable,
	DishInMenuTable,
	DishSetTable,
	DishTable,
	DishInSetTable,
	ImageTable,
	IngredientInRecipeTable,
	IngredientInSetTable,
	IngredientSetTable,
	IngredientTable,
	MenuInScheduleTable,
	MenuTable,
	RecipeImageTable,
	RecipeTable,
	RoleTable,
	ScheduleTable,
	UserRoleTable,
	UserTable,
} from './tables';

export const CURRENT_USER_ID = 'current_user';
export const ADMIN_ROLE_ID = 'admin_role';

interface DBTypes extends DBSchema {
	image: ImageTable;
	ingredientSet: IngredientSetTable;
	ingredient: IngredientTable;
	ingredientInSet: IngredientInSetTable;
	dimension: DimensionTable;
	ingredientInRecipe: IngredientInRecipeTable;
	recipe: RecipeTable;
	recipeImage: RecipeImageTable;
	dish: DishTable;
	dishInSet: DishInSetTable;
	dishSet: DishSetTable;
	dishInMenu: DishInMenuTable;
	menu: MenuTable;
	menuInSchedule: MenuInScheduleTable;
	schedule: ScheduleTable;
	user: UserTable;
	userRole: UserRoleTable;
	role: RoleTable;
}

const makeId = {
	ingredientInSet: (
		ingredientId: IngredientTable['key'],
		setId: IngredientSetTable['key']
	): IngredientInSetTable['key'] => `${ingredientId}-${setId}`,

	ingredientInRecipe: (
		ingredientId: IngredientTable['key'],
		recipeId: RecipeTable['key']
	): IngredientInRecipeTable['key'] => `${ingredientId}-${recipeId}`,

	dishInSet: (dishId: DishTable['key'], setId: DishSetTable['key']): DishInSetTable['key'] => `${dishId}-${setId}`,
	dishInMenu: (dishId: DishTable['key'], menuId: MenuTable['key']): DishInMenuTable['key'] => `${dishId}-${menuId}`,

	menuInSchedule: (menuId: MenuTable['key'], scheduleId: ScheduleTable['key']): MenuInScheduleTable['key'] =>
		`${menuId}-${scheduleId}`,
};

type TableName = StoreNames<DBTypes>;

class IndexedDb {
	private db: IDBPDatabase<DBTypes>;

	constructor(private readonly dbName: string, private readonly dbVersion: number = 9) {}

	async createObjectStore(tableNames: TableName[]): Promise<void | false> {
		try {
			let hasNeedUpdate = false;

			this.db = await openDB<DBTypes>(this.dbName, this.dbVersion, {
				upgrade(db: IDBPDatabase<DBTypes>, oldVersion: number, newVersion: number | null) {
					hasNeedUpdate = oldVersion != newVersion;

					for (const tableName of tableNames) {
						if (db.objectStoreNames.contains(tableName)) {
							if (hasNeedUpdate) {
								db.deleteObjectStore(tableName);
							} else {
								continue;
							}
						}
						db.createObjectStore(tableName);
					}
				},
			});

			if (hasNeedUpdate) {
				this.addInitial(
					'role',
					{
						id: ADMIN_ROLE_ID,
						name: 'Artem',
					},
					ADMIN_ROLE_ID
				);
				this.addInitial(
					'user',
					{
						id: CURRENT_USER_ID,
						name: 'Artem',
						email: 'my@email.com',
						password: '',
					},
					CURRENT_USER_ID
				);
				this.addInitial(
					'userRole',
					{
						role_id: ADMIN_ROLE_ID,
						user_id: CURRENT_USER_ID,
					},
					`${CURRENT_USER_ID}-${ADMIN_ROLE_ID}`
				);

				this.addInitial(
					'dimension',
					{
						id: 'dimension_1',
						name: 'шт',
					},
					'dimension_1'
				);
				this.addInitial(
					'dimension',
					{
						id: 'dimension_2',
						name: 'мл',
					},
					'dimension_2'
				);
				this.addInitial(
					'dimension',
					{
						id: 'dimension_3',
						name: 'л',
					},
					'dimension_3'
				);
				this.addInitial(
					'dimension',
					{
						id: 'dimension_4',
						name: 'кг',
					},
					'dimension_4'
				);
				this.addInitial(
					'dimension',
					{
						id: 'dimension_5',
						name: 'гр',
					},
					'dimension_5'
				);
			}
		} catch (error) {
			return false;
		}
	}

	private addInitial<Table extends TableName>(
		tableName: Table,
		entity: StoreValue<DBTypes, Table>,
		id: StoreKey<DBTypes, Table>
	) {
		const transaction = this.db.transaction(tableName, 'readwrite');
		const store = transaction.objectStore(tableName);
		store.put(entity, id);
	}

	getAll<Table extends TableName>(tableName: Table): Promise<StoreValue<DBTypes, Table>[]> {
		return this.db.getAll(tableName);
	}

	get<Table extends TableName>(tableName: Table, id: StoreKey<DBTypes, Table>): Promise<StoreValue<DBTypes, Table>> {
		const transaction = this.db.transaction(tableName, 'readonly');
		const store = transaction.objectStore(tableName);
		return store.get(id);
	}

	insert<Table extends TableName>(
		tableName: Table,
		id: StoreKey<DBTypes, Table>,
		value: StoreValue<DBTypes, Table>
	): Promise<StoreKey<DBTypes, Table>> {
		const transaction = this.db.transaction(tableName, 'readwrite');
		const store = transaction.objectStore(tableName);
		return store.put(value, id);
	}

	async update<Table extends TableName>(
		tableName: Table,
		id: StoreKey<DBTypes, Table>,
		value: StoreValue<DBTypes, Table>
	): Promise<StoreValue<DBTypes, Table>> {
		const deleteResult = this.delete(tableName, id);
		if (!deleteResult) {
			console.error("Can't to update the record (delete result is negative)");
			return Promise.resolve(undefined);
		}

		const createdId = await this.insert(tableName, id, value);
		return this.get(tableName, createdId);
	}

	async delete<Table extends TableName>(tableName: Table, id: StoreKey<DBTypes, Table>) {
		const transaction = this.db.transaction(tableName, 'readwrite');
		const store = transaction.objectStore(tableName);

		const value = await store.get(id);
		if (value) {
			await store.delete(id);
			return true;
		}

		return false;
	}
}

export { IndexedDb, makeId };
export type { TableName, DBTypes };
