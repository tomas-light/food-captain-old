import React from 'react';
import {
	Grid,
	Radio,
	RadioGroup as MuiRadioGroup,
	RadioGroupProps as MuiRadioGroupProps,
	StyledComponentProps,
} from '@shared/reexport';
import { makeStyles } from '@shared/theme';

import { RadioGroupChild } from './RadioGroupChild';

const useStyles = makeStyles({
	itemContainer: {
		display: 'flex',
	},
	radio: {
		margin: 'auto 0',
	},
});

type RadioButtonClassKey = 'itemContainer' | 'radio';

interface RadioGroupProps extends MuiRadioGroupProps {
	items: RadioGroupChild[];
	disabled?: boolean;
}

interface RadioGroupCallProps {
	onChange: (value: any) => void;
}

type Props = RadioGroupProps & RadioGroupCallProps & StyledComponentProps<RadioButtonClassKey>;

const RadioGroup = (props: Props) => {
	const { classes, className, disabled, items, name, value, onChange, ...rest } = props;

	const _classes = {
		classes,
		...useStyles({}),
	};

	const handleOnChange = (id: number) => () => {
		onChange(id);
	};

	return (
		<MuiRadioGroup {...rest} name={name} value={value} className={className}>
			{items.map((child: RadioGroupChild) => {
				return (
					<Grid item className={_classes.itemContainer} key={`radio-item-${child.id}`}>
						<Radio
							id={`radio-item-${child.id}`}
							color={'secondary'}
							className={_classes.radio}
							disabled={disabled}
							checked={child.id === value}
							onClick={handleOnChange(child.id)}
							value={child.id}
						/>

						{child.component}
					</Grid>
				);
			})}
		</MuiRadioGroup>
	);
};

export { RadioGroup };
export type { RadioGroupProps, RadioButtonClassKey };
