import clsx from 'clsx';
import React, { FC } from 'react';
import { SingleValueProps } from 'react-select';
import { Typography } from '@shared/reexport';
import { makeStyles } from '@shared/theme';

import { FieldOption } from '../../types';

const useStyles = makeStyles({
	singleValue: {
		marginLeft: 2,
		marginRight: 2,
	},
	noValueWrap: {
		overflowX: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
});

type Props = SingleValueProps<FieldOption>;

const DefaultSingleValue: FC<Props> = (props) => {
	const { children, selectProps } = props;

	const classes = useStyles();
	let valueClass = classes.singleValue;

	if (selectProps.noValueWrap) {
		valueClass = clsx(classes.noValueWrap, valueClass);
	}

	return (
		<Typography
			className={valueClass}
			// color={selectProps.isDisabled
			//     ? "disabled"
			//     : selectProps.isFocused
			//         ? "primary"
			//         : "medium"
			// }
		>
			{children}
		</Typography>
	);
};

export { DefaultSingleValue };
