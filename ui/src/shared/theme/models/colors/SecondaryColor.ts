import { InteractiveColor } from '@shared/theme/models/InteractiveColor';
import { SimpleColor } from '@shared/theme/models/SimpleColor';
import { ColorSet } from '../ColorSet';

export class SecondaryColor implements ColorSet {
  main: string;
  hover: string;
  pressed: string;
  text: string;
  disabled: SimpleColor;
  outline: InteractiveColor;

  constructor() {
    this.main = 'rgb(41, 182, 246)';
    this.hover = 'rgba(41, 182, 246, 0.80)';
    this.pressed = 'rgba(41, 182, 246, 0.60)';
    this.text = 'rgba(0, 0, 0, 0.87)';

    this.disabled = {
      main: 'rgba(41, 182, 246, 0.20)',
      text: 'rgba(0, 0, 0, 0.38)',
    };

    this.outline = {
      main: 'rgb(255, 255, 255)',
      hover: 'rgba(41, 182, 246, 0.08)',
      pressed: 'rgba(41, 182, 246, 0.20)',
    };
  }
}
