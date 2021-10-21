import React, { FC, useEffect, useState } from 'react';
import { MenuListComponentProps } from 'react-select/src/components/Menu';
import { List } from 'react-virtualized';
import { Typography } from '@shared/reexport';
import { makeStyles } from '@shared/theme';

import { guid } from '@utils';
import { FieldOption } from '../../types';
import { findNode } from '../../utils';

const useStyles = makeStyles({
	noOptions: {
		display: 'flex',
		padding: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

type Props = MenuListComponentProps<FieldOption, boolean>;

const defaultHeight = 300;
const rowHeight = 48;
const defaultNumberOfRowsForListHeightSize = 6;

const DefaultMenuList: FC<Props> = (props) => {
	const {
		selectProps: { numberOfRowsForListHeightSize = defaultNumberOfRowsForListHeightSize, noOptionsLabel },
		children,
	} = props;

	const classes = useStyles();

	const [listId] = useState<string>(guid());
	const [width, setWidth] = useState<number>(1);
	const [height, setHeight] = useState<number>(defaultHeight);
	const [rowCount, setRowCount] = useState<number>(0);

	useEffect(() => {
		const node: HTMLElement = findNode(listId, 1);
		if (node && node.offsetWidth !== width) {
			setWidth(node.offsetWidth);
		}
	}, []);

	useEffect(() => {
		const count = Array.isArray(children) ? children.length : 0;
		setRowCount(count);

		let newHeight = height;
		if (numberOfRowsForListHeightSize) {
			newHeight = numberOfRowsForListHeightSize * rowHeight;
		}
		if (count === 0) {
			newHeight = rowHeight;
		} else if (count < numberOfRowsForListHeightSize) {
			newHeight = count * rowHeight;
		}
		setHeight(newHeight);
	}, [children]);

	const rowRenderer = ({ key, index, style }) => {
		return (
			<div key={key} style={style}>
				{props.children[index]}
			</div>
		);
	};

	const emptyRowRenderer = () => {
		return (
			<div className={classes.noOptions}>
				<Typography>{noOptionsLabel || 'No options'}</Typography>
			</div>
		);
	};

	return (
		<List
			width={width}
			height={height}
			rowHeight={rowHeight}
			rowCount={rowCount}
			rowRenderer={rowRenderer}
			noRowsRenderer={emptyRowRenderer}
			id={listId}
		/>
	);
};

export { DefaultMenuList };
