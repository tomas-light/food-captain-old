import React from 'react';
import { Field } from 'react-final-form';

import { DragAndDropFieldComponentProps, DragAndDropFieldComponent } from './DragAndDropFieldComponent';
import { FormFieldProps } from '../FormFieldProps';

type Props = FormFieldProps & DragAndDropFieldComponentProps;

const FormField = (props: Props) => (
  <Field
    component={DragAndDropFieldComponent}
    {...props}
  />
);

export { FormField };
