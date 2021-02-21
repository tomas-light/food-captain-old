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
    this.main = 'rgb(106, 27, 154)';
    this.hover = 'rgba(106, 27, 154, 0.80)';
    this.pressed = 'rgba(106, 27, 154, 0.60)';
    this.text = 'rgba(255, 255, 255, 0.87)';

    this.disabled = {
      main: 'rgba(106, 27, 154, 0.12)',
      text: 'rgba(106, 27, 154, 0.38)',
    };

    this.outline = {
      main: 'rgb(255, 255, 255)',
      hover: 'rgba(106, 27, 154, 0.08)',
      pressed: 'rgba(106, 27, 154, 0.20)',
    };
  }
}
