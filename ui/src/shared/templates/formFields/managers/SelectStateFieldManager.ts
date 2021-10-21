import { FieldMetaState } from 'react-final-form';
import { ActionMeta } from 'react-select';

import { FieldOption, isFieldOption } from '@select/types';

export class SelectStateFieldManager {
	private readonly optionInstance: FieldOption;

	constructor(optionInstance: FieldOption<any, any>) {
		this.optionInstance = optionInstance;
	}

	isEmptySingleValue = (valueOrOption: FieldOption<any, any> | any): boolean => {
		if (isFieldOption(valueOrOption)) {
			return valueOrOption.isNullOrEmptySingle();
		}

		return this.optionInstance.isNullOrEmptySingleValue(valueOrOption);
	};

	isEmptyMultiValue = (value): boolean => {
		return this.optionInstance.isNullOrEmptyMultiValue(value);
	};

	getDisplayedValue<TValue = any | any[]>(options: FieldOption<any, any>[], value: TValue) {
		if (Array.isArray(value)) {
			return this.getDisplayedMultiValue(options, value);
		} else {
			return this.getDisplayedSingleValue(options, value);
		}
	}

	getDisplayedSingleValue = (options: FieldOption<any, any>[], value: any): FieldOption<any, any> => {
		if (this.isEmptySingleValue(value)) {
			return this.optionInstance.emptyOption();
		}

		const selectedOption: FieldOption = options.find((option: FieldOption) => option.isEquals(value));

		if (selectedOption !== undefined) {
			return selectedOption;
		}
		return this.optionInstance.emptyOption();
	};

	getDisplayedMultiValue = (options: FieldOption<any, any>[], value: any[]): FieldOption<any, any>[] => {
		if (this.optionInstance.isNullOrEmptyMultiValue(value)) {
			return [];
		}

		const selectedOptions: FieldOption[] = options.filter((option: FieldOption) =>
			value.some((val) => option.isEquals(val))
		);
		return selectedOptions;
	};

	getSelectedValue(option: FieldOption<any, any> | FieldOption<any, any>[], action: ActionMeta<any>) {
		if (Array.isArray(option)) {
			return this.getSelectedMultiValues(option, action);
		} else {
			return this.getSelectedSingleValue(option, action);
		}
	}

	getSelectedSingleValue = (option: FieldOption<any, any>, action: ActionMeta<any>): any => {
		let selectedOption: FieldOption;

		if (option == null || action.action === 'clear') {
			selectedOption = this.optionInstance.emptyOption();
		} else {
			selectedOption = option;
		}

		return selectedOption.getValue();
	};

	public getSelectedMultiValues = (selectedOptions: FieldOption<any, any>[], action: ActionMeta<any>): any[] => {
		let selectedValues: any[];

		if (selectedOptions == null || action.action === 'clear') {
			selectedValues = this.optionInstance.emptyMultiValue();
		} else {
			// const pristineOptions = this.specialOptionService.getCollectionWithoutSpecialOptions(selectedOptions);
			selectedValues = selectedOptions.map((option: FieldOption) => option.getValue());
		}

		return selectedValues;
	};

	isShrink = (meta: FieldMetaState<any>, value: FieldOption<any, any> | FieldOption<any, any>[]): boolean => {
		return meta.active || meta.modified || (!this.isEmptySingleValue(value) && !this.isEmptyMultiValue(value));
	};
}
