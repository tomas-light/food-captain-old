import { FieldErrorProps, FieldLabelProps, FieldLoadingIndicatorProps } from '@shared/molecules/fields';

export interface FieldBaseComponentProps {
	ErrorProps?: Partial<FieldErrorProps>;
	LabelProps?: Partial<FieldLabelProps>;
	LoadingIndicatorProps?: Partial<FieldLoadingIndicatorProps>;
}
