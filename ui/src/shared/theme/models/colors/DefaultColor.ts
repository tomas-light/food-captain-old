import { InteractiveColor } from '@shared/theme/models/InteractiveColor';
import { SimpleColor } from '@shared/theme/models/SimpleColor';
import { ColorSet } from '../ColorSet';

export class DefaultColor implements ColorSet {
  main: string;
  hover: string;
  pressed: string;
  text: string;
  disabled: SimpleColor;
  outline: InteractiveColor;

  constructor() {
    this.main = 'rgb(224, 224, 224)';
    this.hover = 'rgba(224, 224, 224, 0.80)';
    this.pressed = 'rgba(224, 224, 224, 0.60)';
    this.text = 'rgba(255, 255, 255, 0.87)';

    this.disabled = {
      main: 'rgba(224, 224, 224, 0.20)',
      text: 'rgba(224, 224, 224, 0.38)',
    };

    this.outline = {
      main: 'rgb(255, 255, 255)',
      hover: 'rgba(224, 224, 224, 0.08)',
      pressed: 'rgba(224, 224, 224, 0.20)',
    };
  }
}
