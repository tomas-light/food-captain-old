import React from 'react';
import ReactSelect, { GroupTypeBase, Props as SelectProps, Styles } from 'react-select';
import { SelectComponents } from 'react-select/src/components';

import { FieldBaseProps } from '../FieldBase';
import { FieldOption } from './types';
import { filterOptions } from './utils';

interface SelectWrapperProps<TOptions = any> extends SelectProps<TOptions, boolean>, FieldBaseProps {
	options: TOptions[];
	components?: Partial<SelectComponents<any, boolean>>;

	readOnly?: boolean;
	shrink?: boolean;

	name?: string;
	value?: any;
	styles?: Styles<any, boolean, GroupTypeBase<any>>;
}

type Props = SelectWrapperProps<FieldOption>;

const SelectWrapper = (props: Props) => {
	const { id, input, styles, active, ...rest } = props;
	const isInteractive = !rest.readOnly && !rest.disabled;

	const overriddenStyles: Styles<any, boolean, GroupTypeBase<any>> = {
		control: () => ({}), // none of react-select's styles are passed to <Control />
		menu: (base, state) => ({
			...base,
			zIndex: 2,
		}),
		option: () => ({
			height: '100%',
		}),
		indicatorsContainer: (base, state) => ({
			...base,
			'& > div': {
				padding: 0,
			},
		}),
		valueContainer: () => ({}),
		input: (base, state) => ({
			...base,
			margin: 0,
			'& > div': {
				height: '100%',
			},
			'& input': {
				height: '100%',
			},
		}),

		...styles,
	};

	return (
		<ReactSelect
			hideSelectedOptions={false}
			isSearchable={isInteractive}
			isClearable={false}
			inputId={id}
			htmlFor={id}
			filterOption={filterOptions}
			{...input}
			{...rest}
			styles={overriddenStyles}
			// placeholder={""}
			isDisabled={rest.disabled}
			openMenuOnClick={isInteractive}
			isFocused={active && isInteractive}
		/>
	);
};

export { SelectWrapper };
export type { SelectWrapperProps };
