import React from 'react';

import { Menu, User } from '@app/models';
import { ColumnSettings } from '@shared/organisms/Table/models';

export const tableColumns = (t): ColumnSettings[] => [
	{
		propertyName: nameof<Menu>((o) => o.id),
		label: t('id').toUpperCase(),
		sortable: true,
		style: {
			width: 100,
		},
	},
	{
		propertyName: nameof<Menu>((o) => o.name),
		label: t('name').capitalize(),
		sortable: true,
	},
	{
		propertyName: nameof<Menu>((o) => o.author),
		label: t('author').capitalize(),
		sortable: true,
		style: {
			width: 300,
		},
		Component: function C({ children }) {
			const author = children as User;
			return <>{author ? author.name : '-'}</>;
		},
	},
	{
		propertyName: nameof<Menu>((o) => o.createDate),
		label: t('create date').capitalize(),
		sortable: true,
		style: {
			width: 200,
		},
		Component: function C({ children }) {
			const date = new Date(children as string);
			return <>{date.toLocaleDateString()}</>;
		},
	},
	{
		propertyName: nameof<Menu>((o) => o.lastUpdate),
		label: t('last update').capitalize(),
		sortable: true,
		style: {
			width: 200,
		},
		Component: function C({ children }) {
			const date = new Date(children as string);
			return <>{date.toLocaleDateString()}</>;
		},
	},
];
