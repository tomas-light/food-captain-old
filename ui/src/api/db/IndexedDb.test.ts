jest.mock('idb');
import { openDB } from 'idb';
import { StoreKey, StoreValue } from 'idb/build/esm/entry';
import { DBTypes, IndexedDb, TableName } from './IndexedDb';

class MockStore {
	constructor(private readonly dbName: string, private readonly tableName: TableName) {
		this.table = {};
	}

	private get table() {
		return MockStore[this.dbName][this.tableName];
	}

	private set table(value) {
		if (!MockStore[this.dbName]) {
			MockStore[this.dbName] = {};
		}

		if (!MockStore[this.dbName][this.tableName]) {
			MockStore[this.dbName][this.tableName] = value;
		}
	}

	static existTable(dbName: string, tableName: TableName): boolean {
		return MockStore[dbName] && MockStore[dbName][tableName];
	}

	get(key: StoreKey<DBTypes, TableName>): Promise<string> {
		return Promise.resolve(this.table[key]);
	}

	put(value: StoreValue<DBTypes, TableName>, key: StoreKey<DBTypes, TableName>): Promise<string> {
		this.table[key] = value;
		return Promise.resolve(key as any);
	}

	delete(key: StoreKey<DBTypes, TableName>): Promise<void> {
		delete this.table[key];
		return Promise.resolve();
	}
}

class MockDb {
	readonly objectStoreNames = {
		contains: (tableName: TableName) => Boolean(MockStore.existTable(this.dbName, tableName)),
	};

	constructor(readonly dbName: string) {}

	createObjectStore(tableName: TableName) {
		if (!MockStore[this.dbName]) {
			MockStore[this.dbName] = {};
		}
		MockStore[this.dbName][tableName] = {};
	}

	deleteObjectStore(tableName: TableName) {
		if (!MockStore[this.dbName]) {
			MockStore[this.dbName] = {};
		}
		delete MockStore[this.dbName][tableName];
	}

	transaction() {
		const { dbName } = this;
		return {
			objectStore(tableName: TableName): MockStore {
				return new MockStore(dbName, tableName);
			},
		};
	}
}

function mockOpenDb() {
	const mockedOpenDb = openDB as jest.MockedFunction<typeof openDB>;
	mockedOpenDb.mockImplementationOnce((name, version, callback) => {
		const db: any = new MockDb(name);
		callback.upgrade(db, 0, 1, null);
		return Promise.resolve(db);
	});
}

describe('createObjectStore', () => {
	beforeEach(() => {
		mockOpenDb();
	});

	test('add one table', (done) => {
		const instance = new IndexedDb('my_db 1');
		instance
			.createObjectStore(['imagesColored'])
			.then((result) => {
				expect(result).toBe(undefined);
				expect(MockStore['my_db 1']['imagesColored']).not.toBe(undefined);
			})
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});

	test('add two tables', (done) => {
		const instance = new IndexedDb('my_db 2');
		instance
			.createObjectStore(['imagesColored', 'imagesMonochrome'])
			.then((result) => {
				expect(result).toBe(undefined);
				expect(MockStore['my_db 2']['imagesColored']).not.toBe(undefined);
				expect(MockStore['my_db 2']['imagesMonochrome']).not.toBe(undefined);
			})
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});

	test('add table when it already exist', (done) => {
		const instance = new IndexedDb('my_db 1');
		instance
			.createObjectStore(['imagesColored'])
			.then((result) => {
				expect(result).toBe(undefined);
				expect(MockStore['my_db 1']['imagesColored']).not.toBe(undefined);

				mockOpenDb();
				return instance.createObjectStore(['imagesColored', 'imagesMonochrome']);
			})
			.then((result) => {
				expect(result).toBe(undefined);
				expect(MockStore['my_db 1']['imagesColored']).not.toBe(undefined);
				expect(MockStore['my_db 1']['imagesMonochrome']).not.toBe(undefined);
			})
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});
});

describe('get', () => {
	const keys = ['id_10', 'id_11'];
	const values = ['value 10', 'value 11'];
	const instance = new IndexedDb('my_db 3');

	beforeAll((done) => {
		mockOpenDb();

		instance
			.createObjectStore(['imagesColored', 'imagesMonochrome'])
			.then(() => {
				const store = new MockStore('my_db 3', 'imagesColored');
				return store.put(values[0], keys[0]);
			})
			.then(() => {
				const store = new MockStore('my_db 3', 'imagesColored');
				return store.put(values[1], keys[1]);
			})
			.then(() => {
				const store = new MockStore('my_db 3', 'imagesMonochrome');
				return store.put(values[0], keys[0]);
			})
			.then(() => {
				const store = new MockStore('my_db 3', 'imagesMonochrome');
				return store.put(values[1], keys[1]);
			})
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});

	test('value 1 found', (done) => {
		instance
			.get('imagesColored', keys[0])
			.then((value) => {
				expect(value).toBe(values[0]);
			})
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});

	test('value 2 found', (done) => {
		instance
			.get('imagesMonochrome', keys[1])
			.then((value) => {
				expect(value).toBe(values[1]);
			})
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});

	test('not found', (done) => {
		instance
			.get('imagesMonochrome', 'some key')
			.then((value) => {
				expect(value).toBe(undefined);
			})
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});
});

describe('insert', () => {
	const keys = ['id_10', 'id_11'];
	const values = ['value 10', 'value 11'];
	let instance: IndexedDb;

	beforeEach((done) => {
		mockOpenDb();

		instance = new IndexedDb('my_db 4');
		instance
			.createObjectStore(['imagesColored', 'imagesMonochrome'])
			.then(() => undefined)
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});

	test('insert 1', (done) => {
		instance
			.insert('imagesColored', keys[0], values[0])
			.then((value) => {
				expect(value).toBe(keys[0]);
				expect(MockStore['my_db 4']['imagesColored'][keys[0]]).toBe(values[0]);
			})
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});

	test('insert 2', (done) => {
		instance
			.insert('imagesMonochrome', keys[0], values[0])
			.then((value) => {
				expect(value).toBe(keys[0]);
				return instance.insert('imagesMonochrome', keys[1], values[1]);
			})
			.then((value) => {
				expect(value).toBe(keys[1]);
				expect(MockStore['my_db 4']['imagesMonochrome'][keys[0]]).toBe(values[0]);
				expect(MockStore['my_db 4']['imagesMonochrome'][keys[1]]).toBe(values[1]);
			})
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});
});

describe('delete', () => {
	const keys = ['id_10', 'id_11'];
	const values = ['value 10', 'value 11'];
	const instance = new IndexedDb('my_db 5');

	beforeAll((done) => {
		mockOpenDb();

		instance
			.createObjectStore(['imagesColored', 'imagesMonochrome'])
			.then(() => {
				const store = new MockStore('my_db 5', 'imagesColored');
				return store.put(values[0], keys[0]);
			})
			.then(() => {
				const store = new MockStore('my_db 5', 'imagesColored');
				return store.put(values[1], keys[1]);
			})
			.then(() => {
				const store = new MockStore('my_db 5', 'imagesMonochrome');
				return store.put(values[0], keys[0]);
			})
			.then(() => {
				const store = new MockStore('my_db 5', 'imagesMonochrome');
				return store.put(values[1], keys[1]);
			})
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});

	test('delete 1', (done) => {
		const getValue = () => MockStore['my_db 5']['imagesColored'][keys[0]];

		expect(getValue()).toBe(values[0]);

		instance
			.delete('imagesColored', keys[0])
			.then((key) => {
				expect(key).toBe(keys[0]);
				expect(getValue()).toBe(undefined);
			})
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});

	test('delete 2', (done) => {
		const getValue = (index) => MockStore['my_db 5']['imagesMonochrome'][keys[index]];

		expect(getValue(0)).toBe(values[0]);
		expect(getValue(1)).toBe(values[1]);

		instance
			.delete('imagesMonochrome', keys[0])
			.then((key) => {
				expect(key).toBe(keys[0]);
				return instance.delete('imagesMonochrome', keys[1]);
			})
			.then((key) => {
				expect(key).toBe(keys[1]);
				expect(getValue(0)).toBe(undefined);
				expect(getValue(1)).toBe(undefined);
			})
			.catch((error) => {
				done(error);
			})
			.finally(() => {
				done();
			});
	});
});
