import { CSSProperties, ReactElement } from 'react';
import { StyledComponentProps } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Toolbar from '@material-ui/core/Toolbar';

import { withStyles } from '@shared/theme';
import { TableHeader, TableHeaderProps } from '../TableHeader';
import { TableRow, TableRowProps } from '../TableRow';

type ClassKey =
  | 'paper'
  | 'toolbar'
  ;

type Props = StyledComponentProps<ClassKey>
  & Pick<TableHeaderProps, 'columns' | 'selectable' | 'order' | 'orderBy' | 'onSort'>
  & Pick<TableRowProps, 'selectedRows' | 'onRowClick'>
  & {
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
    <Paper classes={{ root: classes.paper }} className={className} style={style}>
      <Toolbar classes={{ root: classes.toolbar }} disableGutters>
        {selectedRows.length
          ? selectedTitle || title
          : title
        }
      </Toolbar>

      <TableContainer>
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

          <TableBody>
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
          </TableBody>
        </MuiTable>
      </TableContainer>

      {Pagination}
    </Paper>
  );
};

const componentWithStyles = withStyles<ClassKey, Props>(theme => ({
  paper: {
    width: '100%',
  },
  toolbar: {
    backgroundColor: props => props.selectedRows && props.selectedRows.length
      ? theme.colors.secondary.outline.hover
      : 'transparent',
  },
}))(Table);
export { componentWithStyles as Table };
export type { ClassKey as TableClassKey };
