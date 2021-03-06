import { OrderVariant } from '@utils/types';
import React, { MouseEvent } from 'react';

type OnSortClick<T> = (event: MouseEvent, propertyName: keyof T) => void;

type HookReturnType<T> = [OrderVariant, keyof T, OnSortClick<T>];

function useOrdering<T>(propertyName: keyof T): HookReturnType<T> {
  const [order, setOrder] = React.useState<OrderVariant>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof T>(propertyName);

  const onSort = (event, newPropertyName: keyof T) => {
    const isAsc = orderBy === newPropertyName && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(newPropertyName);
  };

  return [
    order,
    orderBy,
    onSort,
  ];
}

export { useOrdering };
export type { OnSortClick };
