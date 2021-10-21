import { ChangeEvent } from 'react';

type FieldOnChange = (event: ChangeEvent<HTMLInputElement> | any) => void;

interface HookProps {
	readOnly?: boolean;
	disabled?: boolean;
	onFieldChange?: FieldOnChange;
	onValueChange?: (value) => void;
}

const useHandleChangeOfFormRadio = (props: HookProps) => {
	const { onFieldChange, onValueChange, readOnly = false, disabled = false } = props;

	const handleOnChange = (event: string | number | ChangeEvent<HTMLInputElement>) => {
		if (readOnly || disabled) {
			return;
		}

		try {
			let value: number;

			if (typeof event === 'string') {
				value = parseInt(event, 10);
			} else if (typeof event === 'number') {
				value = event;
			} else if (typeof event === 'object') {
				value = parseInt(event.target.value, 10);
			}

			if (onFieldChange && typeof onFieldChange === 'function') {
				onFieldChange(value);
			}
			if (onValueChange && typeof onValueChange === 'function') {
				onValueChange(value);
			}
		} catch (error) {
			console.log("!!! Can't parse event value: ");
			console.log(event);
		}
	};

	return handleOnChange;
};

export { useHandleChangeOfFormRadio };
