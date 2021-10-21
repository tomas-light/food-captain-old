import { InteractiveColor } from '@shared/theme/models/InteractiveColor';
import { SimpleColor } from '@shared/theme/models/SimpleColor';
import { ColorSet } from '../ColorSet';

export class DestructiveColor implements ColorSet {
	main: string;
	hover: string;
	pressed: string;
	text: string;
	disabled: SimpleColor;
	outline: InteractiveColor;

	constructor() {
		this.main = 'rgb(220, 0, 53)';
		this.hover = 'rgba(220, 0, 53, 0.80)';
		this.pressed = 'rgba(220, 0, 53, 0.60)';
		this.text = 'rgba(255, 255, 255, 0.87)';

		this.disabled = {
			main: 'rgba(220, 0, 53, 0.12)',
			text: 'rgba(220, 0, 53, 0.38)',
		};

		this.outline = {
			main: 'rgb(255, 255, 255)',
			hover: 'rgba(220, 0, 53, 0.08)',
			pressed: 'rgba(220, 0, 53, 0.20)',
		};
	}
}
