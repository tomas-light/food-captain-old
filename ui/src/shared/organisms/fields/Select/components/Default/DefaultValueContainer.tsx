import React, { FC } from 'react';
import { components } from 'react-select';
import { ValueContainerProps } from 'react-select/src/components/containers';
import { makeStyles } from '@shared/theme';

import { SelectFieldOption } from '../../types';

const useStyles = makeStyles({
	valueContainer: {
		display: 'flex',
		flexWrap: 'nowrap',
		position: 'relative',
		overflow: 'hidden',
		boxSizing: 'border-box',
		flex: 1,
		alignItems: 'center',
	},
});

type Props = ValueContainerProps<SelectFieldOption, boolean>;

const DefaultValueContainer: FC<Props> = (props) => {
	const { children, ...rest } = props;

	const classes = useStyles();

	return (
		<components.ValueContainer {...rest} className={classes.valueContainer}>
			{children}
		</components.ValueContainer>
	);
};

export { DefaultValueContainer };
