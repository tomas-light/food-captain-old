import React from 'react';
import { useSelectionMethods } from './useSelectionMethods';

class User {
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}

const inputArray: User[] = [
	new User('Riley'),
	new User('Garry'),
	new User('Anton'),
	new User('Max'),
	new User('Sophie'),
	new User('Daniel'),
];

test('first selection', () => {
	let selected: User[] = [];
	const onSelect = jest.fn((rows) => {
		selected = rows;
	});

	const [onRowClick] = useSelectionMethods(inputArray, selected, onSelect);

	const [user] = inputArray;
	onRowClick(user);

	expect(onSelect.call.length).toBe(1);
	expect(selected != inputArray).toBe(true);
	expect(selected.includes(user)).toBe(true);
	expect(selected.length).toBe(1);
});

test('select one', () => {
	let selected: User[] = [inputArray[0], inputArray[1], inputArray[2], inputArray[3]];

	const onSelect = jest.fn((rows) => {
		selected = rows;
	});

	const [onRowClick] = useSelectionMethods(inputArray, selected, onSelect);

	// eslint-disable-next-line prefer-destructuring
	const user = inputArray[4];
	onRowClick(user);

	expect(onSelect.call.length).toBe(1);
	expect(selected != inputArray).toBe(true);
	expect(selected.includes(user)).toBe(true);
	expect(selected.length).toBe(5);
});

test('select all', () => {
	let selected: User[] = [];

	const onSelect = jest.fn((rows) => {
		selected = rows;
	});

	const [, onAllClick] = useSelectionMethods(inputArray, selected, onSelect);

	const mockEvent = {
		target: {
			checked: true,
		},
	} as React.ChangeEvent<HTMLInputElement>;
	onAllClick(mockEvent);

	expect(onSelect.call.length).toBe(1);
	expect(selected != inputArray).toBe(true);
	inputArray.forEach((user) => {
		expect(selected.includes(user)).toBe(true);
	});
	expect(selected.length).toBe(inputArray.length);
});

test('unselect all', () => {
	let selected: User[] = [...inputArray];

	const onSelect = jest.fn((rows) => {
		selected = rows;
	});

	const [, onAllClick] = useSelectionMethods(inputArray, selected, onSelect);

	const mockEvent = {
		target: {
			checked: true,
		},
	} as React.ChangeEvent<HTMLInputElement>;
	onAllClick(mockEvent);

	expect(onSelect.call.length).toBe(1);
	expect(selected != inputArray).toBe(true);
	expect(selected.length).toBe(0);
});

test('unselect all when some selected', () => {
	let selected: User[] = [inputArray[0], inputArray[3]];

	const onSelect = jest.fn((rows) => {
		selected = rows;
	});

	const [, onAllClick] = useSelectionMethods(inputArray, selected, onSelect);

	const mockEvent = {
		target: {
			checked: true,
		},
	} as React.ChangeEvent<HTMLInputElement>;
	onAllClick(mockEvent);

	expect(onSelect.call.length).toBe(1);
	expect(selected != inputArray).toBe(true);
	expect(selected.length).toBe(0);
});

test('unselect one at start', () => {
	let selected: User[] = [inputArray[0], inputArray[1], inputArray[2], inputArray[3]];

	const onSelect = jest.fn((rows) => {
		selected = rows;
	});

	const [onRowClick] = useSelectionMethods(inputArray, selected, onSelect);

	const [user] = inputArray;
	onRowClick(user);

	expect(onSelect.call.length).toBe(1);
	expect(selected != inputArray).toBe(true);
	expect(selected.includes(user)).toBe(false);
	expect(selected.length).toBe(3);
});

test('unselect one at end', () => {
	let selected: User[] = [inputArray[0], inputArray[1], inputArray[2], inputArray[3]];

	const onSelect = jest.fn((rows) => {
		selected = rows;
	});

	const [onRowClick] = useSelectionMethods(inputArray, selected, onSelect);

	// eslint-disable-next-line prefer-destructuring
	const user = inputArray[3];
	onRowClick(user);

	expect(onSelect.call.length).toBe(1);
	expect(selected != inputArray).toBe(true);
	expect(selected.includes(user)).toBe(false);
	expect(selected.length).toBe(3);
});

test('unselect one in middle', () => {
	let selected: User[] = [inputArray[0], inputArray[1], inputArray[2], inputArray[3]];

	const onSelect = jest.fn((rows) => {
		selected = rows;
	});

	const [onRowClick] = useSelectionMethods(inputArray, selected, onSelect);

	const [, user] = inputArray;
	onRowClick(user);

	expect(onSelect.call.length).toBe(1);
	expect(selected != inputArray).toBe(true);
	expect(selected.includes(user)).toBe(false);
	expect(selected.length).toBe(3);
});
