import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { components, SingleValueProps } from 'react-select';
import { Typography } from '@shared/reexport';
import { makeStyles } from '@shared/theme';

import { FieldOption } from '../../types';

const useStyles = makeStyles((theme) => ({
	singleValue: {
		display: 'flex',
		alignItems: 'center',

		marginLeft: 2,
		marginRight: 2,
		maxWidth: 'calc(100% - 8px)',
		overflow: 'hidden',
		position: 'absolute',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		top: '50%',
		'-webkit-transform': 'translateY(-50%)',
		'-ms-transform': 'translateY(-50%)',
		transform: 'translateY(-50%)',
		boxSizing: 'border-box',

		color: theme.colors.text.medium,
	},
	activeSingleValue: {
		color: theme.palette.primary.main,
	},
	disabledSingleValue: {
		color: theme.colors.text.disabled,
	},
	iconWrapper: {
		padding: 12,
		'&:hover': {
			borderRadius: '50%',
		},
	},
}));

export interface SingleValueWithIconProps {
	selectProps: {
		icon?: ReactElement;
		renderIcon?: (option: FieldOption) => ReactElement;
	};
}

type Props = SingleValueProps<FieldOption> & SingleValueWithIconProps;

const SingleValueWithIcon = (props: Props) => {
	const { children, data, ...rest } = props;

	const {
		selectProps: { active, icon, renderIcon },
		isDisabled,
	} = rest;

	const classes = useStyles();

	return (
		<components.SingleValue
			{...props}
			className={clsx(
				classes.singleValue,
				active ? classes.activeSingleValue : '',
				isDisabled ? classes.disabledSingleValue : ''
			)}
		>
			{icon ? <span className={classes.iconWrapper}>{icon}</span> : renderIcon(data)}

			<Typography noWrap>{children}</Typography>
		</components.SingleValue>
	);
};

export { SingleValueWithIcon };
