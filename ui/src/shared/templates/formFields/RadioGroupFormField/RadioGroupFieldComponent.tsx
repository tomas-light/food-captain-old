import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { RadioGroup, RadioGroupProps } from '@shared/organisms/fields';
import { FieldComponentCallProps } from '../FieldComponentCallProps';
import { useHandleChangeOfFormRadio } from '../RadioButtonFormField/useHandleChangeOfFormRadio';

interface RadioGroupFieldComponentProps extends RadioGroupProps, FieldComponentCallProps {}

type Props = RadioGroupFieldComponentProps & FieldRenderProps<any, HTMLInputElement>;

const RadioGroupFieldComponent = (props: Props) => {
	const {
		input: { onChange, value },
		sideOnChange,
		meta,
		...rest
	} = props;

	const handleOnChange = useHandleChangeOfFormRadio({
		onFieldChange: onChange,
		onValueChange: sideOnChange,
		readOnly: rest.readOnly,
		disabled: rest.disabled,
	});

	return <RadioGroup {...rest} value={value} onChange={handleOnChange} />;
};

export { RadioGroupFieldComponent };
export type { RadioGroupFieldComponentProps };
