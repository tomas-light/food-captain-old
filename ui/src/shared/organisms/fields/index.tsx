import { TextAreaField, TextAreaFieldProps } from './TextAreaField';
import { TextField, TextFieldProps } from './TextField';

type FieldVariant =
	// | 'checkbox'
	// | 'date'
	// | 'single-select'
	// | 'multi-select'
	// | 'number'
	// | 'radio-button'
	'text-area' | 'text';

type FieldPropsVariant<TFieldVariant extends FieldVariant = 'text'> =
  TFieldVariant extends 'text-area'
    ? TextAreaFieldProps
    : TFieldVariant extends 'text'
      ? TextFieldProps
      : never;

type Props<TFieldVariant extends FieldVariant = 'text'> = {
  variant?: TFieldVariant;
} & FieldPropsVariant<TFieldVariant>;

function Field<TFieldVariant extends FieldVariant = 'text'>(props: Props<TFieldVariant>) {
  const { variant = 'text', ...rest } = props;

  switch (variant) {
    case 'text-area':
      return <TextAreaField {...(rest as unknown as TextAreaFieldProps)} />;

    case 'text':
    default:
      return <TextField {...(rest as unknown as TextFieldProps)} />;
  }
}

export { Field };
export type { Props as FieldProps };
