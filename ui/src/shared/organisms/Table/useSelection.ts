import React from 'react';

import { RowClick, SelectAllClick, useSelectionMethods } from './useSelectionMethods';

function useSelection<TRow = any>(rows: TRow[]): [TRow[], RowClick, SelectAllClick] {
	const [selected, setSelected] = React.useState<TRow[]>([]);

	const [handleRowClick, handleSelectAllClick] = useSelectionMethods(rows, selected, setSelected);

	return [selected, handleRowClick, handleSelectAllClick];
}

export { useSelection };
