import clsx from 'clsx';
import { MouseEvent } from 'react';
import { TableCell as MuiTableCell, TableSortLabel as MuiTableSortLabel } from '@shared/reexport';

import { makeStyles } from '@shared/theme';
import { OrderVariant } from '@utils/types';
import { ColumnSettings } from '../Table/models';

const useStyles = makeStyles({
	padding: {
		padding: '10px 12px',
	},
});

type Props = {
	column: ColumnSettings;
	order: OrderVariant;
	orderBy: string;
	onSort: (event: MouseEvent) => void;
};

const SortableColumn = (props: Props) => {
	const { column, order, orderBy, onSort } = props;
	const classes = useStyles();

	return (
		<MuiTableCell
			key={column.propertyName}
			align={column.isNumeric ? 'right' : 'left'}
			padding={column.disablePadding ? 'none' : 'normal'}
			sortDirection={column.sortable && orderBy === column.propertyName ? order : false}
			className={clsx({
				[classes.padding]: !column.disablePadding,
			})}
			style={column.style}
		>
			<MuiTableSortLabel
				active={orderBy === column.propertyName}
				direction={orderBy === column.propertyName ? order : 'asc'}
				onClick={onSort}
			>
				{column.label}
			</MuiTableSortLabel>
		</MuiTableCell>
	);
};

export type { Props as SortableColumnProps };
export { SortableColumn };
