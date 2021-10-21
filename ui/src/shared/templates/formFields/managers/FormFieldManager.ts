import { FieldMetaState } from 'react-final-form';

export class FormFieldManager {
	areErrorsDisplayed = (meta: FieldMetaState<any>): boolean => {
		let displayed = false;

		if (meta.error) {
			displayed = true;
		}
		if (meta.dirtySinceLastSubmit) {
			displayed = false;
		}

		return displayed;
	};
}
