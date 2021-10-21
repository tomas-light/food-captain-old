import React from 'react';
import { IndicatorProps } from 'react-select/src/components/indicators';
import { IconButton, CloseIcon } from '@shared/reexport';
import { makeStyles } from '@shared/theme';

import { FieldOption } from '../../types';

const useStyles = makeStyles({
	padding: {
		padding: 6,
	},
});

type Props = IndicatorProps<FieldOption, boolean>;

const DefaultClearIndicator = (props: Props) => {
	const { clearValue } = props;
	const classes = useStyles();
	return (
		<IconButton onClick={clearValue} className={classes.padding}>
			<CloseIcon />
		</IconButton>
	);
};

export { DefaultClearIndicator };
