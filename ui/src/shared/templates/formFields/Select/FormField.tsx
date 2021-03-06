import React from 'react';
import { Field } from 'react-final-form';

import { SelectFieldComponentProps, SelectFieldComponent } from './SelectFieldComponent';
import { FormFieldProps } from '../FormFieldProps';

type Props = FormFieldProps & SelectFieldComponentProps;

const FormField = (props: Props) => (
  <Field
    component={SelectFieldComponent}
    {...props}
  />
);

export { FormField };
