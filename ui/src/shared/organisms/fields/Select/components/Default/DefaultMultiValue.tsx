import React, { FunctionComponent } from 'react';
import { components } from 'react-select';
import { MultiValueProps } from 'react-select';
import { makeStyles } from '@shared/theme';

import { FieldOption } from '@select/types';

const useStyles = makeStyles((theme) => ({
	multiValue: {
		display: 'flex',
		alignItems: 'center',
		whiteSpace: 'nowrap',
		marginLeft: 2,
		marginRight: 2,
	},
}));

type Props = MultiValueProps<FieldOption>;

const DefaultMultiValue: FunctionComponent<Props> = (props: Props) => {
	const classes = useStyles();
	return <components.MultiValue {...props} className={classes.multiValue} />;
};

export { DefaultMultiValue };
