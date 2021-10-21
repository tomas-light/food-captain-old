import { MenuItem, Tooltip, Typography } from '@shared/reexport';
import { components } from 'react-select';
import { OptionProps } from 'react-select/src/components/Option';
import { makeStyles } from '@shared/theme';

import { FieldOption } from '../../types';

const useStyles = makeStyles({
	tooltip: {
		fontSize: '0.8rem',
	},
	option: {
		height: '100%',
	},
});

type Props = OptionProps<FieldOption, boolean>;

const DefaultSingleOption = (props: Props) => {
	const classes = useStyles();

	return (
		<components.Option {...props}>
			<Tooltip title={props.children} enterDelay={1000} classes={{ tooltip: classes.tooltip }}>
				<MenuItem className={classes.option}>
					<Typography variant={'body1'} noWrap={true}>
						{props.children}
					</Typography>
				</MenuItem>
			</Tooltip>
		</components.Option>
	);
};

export { DefaultSingleOption };
