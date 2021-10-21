import { ComponentType, CSSProperties, ReactElement } from 'react';

export type ColumnSettings = {
	propertyName: string;
	label: string | ReactElement;
	sortable?: boolean;
	isNumeric?: boolean;
	disablePadding?: boolean;
	style?: CSSProperties;
	Component?: ComponentType;
};
