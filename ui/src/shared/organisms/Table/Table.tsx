import { CSSProperties, ReactElement } from 'react';
import { StyledComponentProps, Paper as MuiPaper, Table as MuiTable, TableBody as MuiTableBody, TableContainer as MuiTableContainer, Toolbar as MuiToolbar } from '@shared/reexport';

import { withStyles } from '@shared/theme';
import { TableHeader, TableHeaderProps } from '../TableHeader';
import { TableRow, TableRowProps } from '../TableRow';

type ClassKey = 'paper' | 'toolbar';

type Props = StyledComponentProps<ClassKey> &
	Pick<TableHeaderProps, 'columns' | 'selectable' | 'order' | 'orderBy' | 'onSort'> &
	Pick<TableRowProps, 'selectedRows' | 'onRowClick'> & {
		rows: any[];
		rowLength?: number;
		idPropertyName: string;
		title: string | ReactElement;

		selectedTitle?: string | ReactElement;

		Pagination?: ReactElement;
		style?: CSSProperties;
		className?: string;

		onSelectAll?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	};

const Table = (props: Props) => {
	const {
		columns,
		rows,
		rowLength,
		idPropertyName,
		title,

		order,
		orderBy,
		onSort,

		selectable = false,
		selectedRows = [],
		selectedTitle,
		onRowClick,
		onSelectAll,

		Pagination,
		style,
		className,
		classes,
	} = props;

	return (
		<MuiPaper classes={{ root: classes.paper }} className={className} style={style}>
			<MuiToolbar classes={{ root: classes.toolbar }} disableGutters>
				{selectedRows.length ? selectedTitle || title : title}
			</MuiToolbar>

			<MuiTableContainer>
				<MuiTable size="medium">
					<TableHeader
						columns={columns}
						selectable={selectable}
						selectedRowCount={selectedRows.length}
						rowCount={rowLength || rows.length}
						onCheck={onSelectAll}
						order={order}
						orderBy={orderBy}
						onSort={onSort}
					/>

					<MuiTableBody>
						{rows.map((row, index) => (
							<TableRow
								key={`table-row-${row[idPropertyName] ? row[idPropertyName] : index}`}
								columns={columns}
								row={row}
								selectable={selectable}
								selectedRows={selectedRows}
								onRowClick={onRowClick}
							/>
						))}
					</MuiTableBody>
				</MuiTable>
			</MuiTableContainer>

			{Pagination}
		</MuiPaper>
	);
};

const componentWithStyles = withStyles<ClassKey, Props>((theme) => ({
	paper: {
		width: '100%',
	},
	toolbar: {
		backgroundColor: (props) =>
			props.selectedRows && props.selectedRows.length ? theme.colors.secondary.outline.hover : 'transparent',
	},
}))(Table);
export { componentWithStyles as Table };
export type { ClassKey as TableClassKey };
