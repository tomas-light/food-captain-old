import React from 'react';

type RowClick<TRow = any> = (row: TRow) => void;
type SelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => void;

type HookReturnType = [RowClick, SelectAllClick];

function useSelectionMethods<TRow = any>(
	rows: TRow[],
	selectedRows: TRow[],
	setSelectedRows: (selectedRows: TRow[]) => void
): HookReturnType {
	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked && selectedRows.length === 0) {
			const newSelectedRows = [...rows];
			setSelectedRows(newSelectedRows);
			return;
		}
		setSelectedRows([]);
	};

	const handleRowClick = (row: TRow) => {
		const selectedIndex = selectedRows.indexOf(row);
		let newSelected: TRow[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedRows, row);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selectedRows.slice(1));
		} else if (selectedIndex === selectedRows.length - 1) {
			newSelected = newSelected.concat(selectedRows.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
		}

		setSelectedRows(newSelected);
	};

	return [handleRowClick, handleSelectAllClick];
}

export { useSelectionMethods };
export type { RowClick, SelectAllClick };
