import { InteractiveColor } from './InteractiveColor';
import { SimpleColor } from './SimpleColor';

export interface ColorSet extends InteractiveColor {
	text: string;
	disabled: SimpleColor;
	outline: InteractiveColor;
}
