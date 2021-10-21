import { Dish, Menu, User } from '@models';
import { IDBPDatabase, openDB } from 'idb';
import { DBSchema, StoreKey, StoreNames, StoreValue } from 'idb/build/esm/entry';

// type ImageTable = {
//   key: string;
//   value: string;
// };

type DishTable = {
	key: number;
	value: Dish;
};
type MenuTable = {
	key: number;
	value: Menu;
};
type UserTable = {
	key: number;
	value: User;
};

interface DBTypes extends DBSchema {
	dishes: DishTable;
	menus: MenuTable;
	users: UserTable;
}

type TableName = StoreNames<DBTypes>;

class IndexedDb {
	private db: IDBPDatabase<DBTypes>;

	constructor(private readonly dbName: string, private readonly dbVersion: number = 4) {}

	async createObjectStore(tableNames: TableName[]): Promise<void | false> {
		try {
			this.db = await openDB<DBTypes>(this.dbName, this.dbVersion, {
				upgrade(db: IDBPDatabase<DBTypes>, oldVersion: number, newVersion: number | null) {
					const hasNeedUpdate = oldVersion != newVersion;

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
		} catch (error) {
			return false;
		}
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
	): Promise<StoreKey<DBTypes, Table>> {
		const deleteResult = this.delete(tableName, id);
		if (!deleteResult) {
			console.error("Can't to update the record (delete result is negative)");
			return Promise.resolve(undefined);
		}

		return this.insert(tableName, id, value);
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

export { IndexedDb };
export type { TableName, DBTypes };
