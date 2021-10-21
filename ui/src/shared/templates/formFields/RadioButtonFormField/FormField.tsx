import React from 'react';
import { Field } from 'react-final-form';

import { RadioButtonFieldComponentProps, RadioButtonFieldComponent } from './RadioButtonFieldComponent';
import { FormFieldProps } from '../FormFieldProps';

type Props = FormFieldProps & RadioButtonFieldComponentProps;

const FormField = (props: Props) => <Field component={RadioButtonFieldComponent} {...props} />;

export { FormField };
