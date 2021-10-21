import clsx from 'clsx';
import { TableCell, TableRow as MuiTableRow } from '@shared/reexport';

import { makeStyles } from '@shared/theme';
import { ColumnSettings } from '../Table/models';

const useStyles = makeStyles({
	padding: {
		padding: '10px 12px',
	},
});

type Props = {
	columns: ColumnSettings[];
	row: any;
};

const Row = (props: Props) => {
	const { columns, row } = props;
	const classes = useStyles();

	return (
		<MuiTableRow>
			{columns.map((column) => (
				<TableCell
					key={`cell-${column.propertyName}`}
					align={column.isNumeric ? 'right' : 'left'}
					padding={column.disablePadding ? 'none' : 'normal'}
					className={clsx({
						[classes.padding]: !column.disablePadding,
					})}
				>
					{column.Component ? (
						<column.Component>{row[column.propertyName]}</column.Component>
					) : (
						row[column.propertyName]
					)}
				</TableCell>
			))}
		</MuiTableRow>
	);
};

export type { Props as RowProps };
export { Row };
