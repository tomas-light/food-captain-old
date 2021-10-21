import { InteractiveColor } from '@shared/theme/models/InteractiveColor';
import { SimpleColor } from '@shared/theme/models/SimpleColor';
import { ColorSet } from '../ColorSet';

export class PrimaryColor implements ColorSet {
	main: string;
	hover: string;
	pressed: string;
	text: string;
	disabled: SimpleColor;
	outline: InteractiveColor;

	constructor() {
		this.main = 'rgb(253, 237, 114)';
		this.hover = 'rgba(253, 237, 114, 0.80)';
		this.pressed = 'rgba(253, 237, 114, 0.60)';
		this.text = 'rgba(0, 0, 0, 0.87)';

		this.disabled = {
			main: 'rgba(253, 237, 114, 0.12)',
			text: 'rgba(0, 0, 0, 0.38)',
		};

		this.outline = {
			main: 'rgb(255, 255, 255)',
			hover: 'rgba(253, 237, 114, 0.08)',
			pressed: 'rgba(253, 237, 114, 0.20)',
		};
	}
}
