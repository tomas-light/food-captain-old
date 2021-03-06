import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Menu } from '@app/models';
import { Table, useOrdering, usePagination, useSelectionMethods } from '@shared/organisms/Table';
import { stableSort } from '@utils';
import { getComparator } from '@utils/comparison';
import { TableTitle } from './TableTitle';
import { tableColumns } from './tableColumns';

interface MenuTableProps {
  menus: Menu[];
  selectedMenus: Menu[];
}

interface MenuTableCallProps {
  onSelectMenu: (menu: Menu[]) => void;
}

type Props = MenuTableProps & MenuTableCallProps

const MenuTable = (props: Props) => {
  const { menus, selectedMenus, onSelectMenu } = props;

  const { t } = useTranslation();
  const columns = useMemo(() => tableColumns(t), [ t ]);

  const [rows, setRows] = useState<Menu[]>([]);
  const [order, orderBy, handleSort] = useOrdering<Menu>('id');
  const [handleRowClick, handleSelectAllClick] = useSelectionMethods(menus, selectedMenus, onSelectMenu);

  const [
    TablePagination,
    page,
    pageSize,
  ] = usePagination(menus.length, 10, [10, 20, 40]);

  useEffect(() => {
    const comparator = getComparator<Menu>(order, orderBy);
    const startIndex = page * pageSize;
    const _rows = stableSort(menus, comparator).slice(startIndex, startIndex + pageSize);

    setRows(_rows);
  }, [menus, page, pageSize, order, orderBy]);

  return (
    <Table
      columns={columns}
      rows={rows}
      rowLength={menus.length}
      idPropertyName={nameof<Menu>(o => o.id)}
      title={<TableTitle />}

      selectable
      selectedRows={selectedMenus}
      onRowClick={handleRowClick}
      onSelectAll={handleSelectAllClick}

      Pagination={TablePagination}

      order={order}
      orderBy={orderBy}
      onSort={handleSort}
      // style={style}
      // className={className}
    />
  );
};

export type { MenuTableProps, MenuTableCallProps };
export { MenuTable };
