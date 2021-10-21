import { SelectFieldOption } from './SelectFieldOption';

export class IconSelectFieldOption extends SelectFieldOption<number> {
	static create(): IconSelectFieldOption {
		return new IconSelectFieldOption();
	}

	emptySingleValue(): number {
		return 0;
	}

	emptyOption = (): IconSelectFieldOption => {
		return new IconSelectFieldOption();
	};
}
