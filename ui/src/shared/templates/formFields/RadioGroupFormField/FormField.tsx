import React from 'react';
import { Field } from 'react-final-form';

import { RadioGroupFieldComponent, RadioGroupFieldComponentProps } from './RadioGroupFieldComponent';
import { FormFieldProps } from '../FormFieldProps';

type Props = FormFieldProps & RadioGroupFieldComponentProps;

const FormField = (props: Props) => <Field component={RadioGroupFieldComponent} {...props} />;

export { FormField };
