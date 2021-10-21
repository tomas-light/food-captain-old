import React from 'react';
import { Field } from 'react-final-form';

import { TextFieldComponentProps, TextFieldComponent } from './TextFieldComponent';
import { FormFieldProps } from '../FormFieldProps';

type Props = FormFieldProps & TextFieldComponentProps;

const FormField = (props: Props) => <Field component={TextFieldComponent} {...props} />;

export { FormField };
