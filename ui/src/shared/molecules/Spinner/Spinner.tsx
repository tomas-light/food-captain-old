import clsx from 'clsx';
import React from 'react';
import { CircularProgress, CircularProgressClassKey, CircularProgressProps } from '@shared/reexport';

import { makeStyles } from '@shared/theme';
import { ClassNameMap } from '@utils/types';

const useStyles = makeStyles({
	hidden: {
		display: 'none !important',
	},
});

interface SpinnerProps {
	visible: boolean;
	classes?: ClassNameMap<CircularProgressClassKey>;
}

type Props = SpinnerProps & CircularProgressProps;

const Spinner = (props: Props) => {
	const { visible, classes = {}, ...rest } = props;

	const loaderClasses = useStyles();

	return (
		<CircularProgress
			color="primary"
			classes={{
				...classes,
				root: clsx(!visible && loaderClasses.hidden, classes.root),
			}}
			{...rest}
		/>
	);
};

export type { Props as SpinnerProps };
export { Spinner };
