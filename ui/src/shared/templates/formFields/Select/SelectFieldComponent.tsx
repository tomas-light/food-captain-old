import React, { useMemo, useState, FocusEvent } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { ActionMeta, InputActionMeta } from 'react-select';

import { FieldOption, FieldOptionVariant } from '@select/types';
import { Select, SelectProps, ActionTypes } from '@shared/templates/Select';
import { FieldOptionsFactory } from './Factories';
import { FormFieldManager, SelectStateFieldManager } from '../managers';

interface SelectFieldComponentProps extends SelectProps {
	optionType?: FieldOptionVariant;
	sideOnChange?: (value: any, actionType?: ActionTypes) => void;
	clearOnBlur?: boolean;
}

type Props = SelectFieldComponentProps & FieldRenderProps<any, HTMLInputElement>;

const SelectFieldComponent = (props: Props) => {
	const {
		input: { name, onChange, onFocus, onBlur, value, ...restInput },
		sideOnChange,
		options,
		meta,
		optionType = FieldOptionVariant.SelectFieldOption,
		onInputChange,
		clearOnBlur = false,
		helperText,
		...rest
	} = props;

	const [formManager] = useState<FormFieldManager>(new FormFieldManager());
	const [stateManager] = useState<SelectStateFieldManager>(
		new SelectStateFieldManager(FieldOptionsFactory.make(optionType))
	);
	const [stateValue, setStateValue] = useState<any>(value);
	const [isInputChanged, setIsInputChanged] = useState<boolean>(false);

	const displayedValue = useMemo(() => {
		const fieldOption = stateManager.getDisplayedValue(options, value);

		if (Array.isArray(fieldOption)) {
			const ids = fieldOption.map((option) => option.id);
			// if (!ArraysHelper.areSimilar(ids, stateValues)) {
			if (!ids.areSimilar(ids, stateValue)) {
				setStateValue(ids);
			}
		} else {
			if (!fieldOption.isEquals(stateValue)) {
				const selectedValue = fieldOption.getValue();
				setStateValue(selectedValue);
			}
		}

		if (rest.isMulti && !Array.isArray(fieldOption)) {
			return [fieldOption];
		}

		return fieldOption;
	}, [options, value]);

	const handleOnChange = (option: FieldOption<any, any>, action: ActionMeta<any>) => {
		if (rest.readOnly || rest.disabled) {
			return;
		}

		// const selectedOption = stateManager.getSelectedSingleValue(option, action);
		// const selectedValue = selectedOption.getValue();
		const selectedValue = stateManager.getSelectedValue(option, action);

		setStateValue(selectedValue);
		onChange(selectedValue);
		if (typeof sideOnChange === 'function') {
			sideOnChange(selectedValue, action.action);
		}

		setIsInputChanged(false);
	};

	// for validation on blur
	// if we start type, we should call onChange to trigger validation and
	// mark field as last focused
	const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
		setIsInputChanged(true);
		if (typeof onInputChange === 'function' && actionMeta.action === 'input-change') {
			onInputChange(newValue, actionMeta);
			// trigger for field validation
			onChange(stateValue);
		}
	};

	const handleOnBlur = (event: FocusEvent<any>) => {
		onBlur(event);
		if (typeof rest.onBlur === 'function') {
			rest.onBlur(event);
		}
		if (clearOnBlur && isInputChanged) {
			const option = FieldOptionsFactory.make(optionType);
			handleOnChange(option.emptyOption(), { action: 'clear' });
		}
		setIsInputChanged(false);
	};

	const areErrorsDisplayed = formManager.areErrorsDisplayed(meta);
	const shrink = stateManager.isShrink(meta, displayedValue);

	const getOptionLabel = (option: FieldOption) => option.title;
	const getOptionValue = (option: FieldOption) => option.id.toString();

	return (
		<Select
			{...restInput}
			{...rest}
			active={meta.active}
			shrink={shrink}
			helperText={areErrorsDisplayed ? meta.error || meta.submitError : helperText}
			error={areErrorsDisplayed}
			options={options}
			getOptionLabel={getOptionLabel}
			getOptionValue={getOptionValue}
			value={displayedValue}
			onChange={handleOnChange}
			onFocus={onFocus}
			onBlur={handleOnBlur}
			onInputChange={handleInputChange}
		/>
	);
};

export { SelectFieldComponent };
export type { SelectFieldComponentProps };
