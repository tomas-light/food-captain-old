import {
  DefaultColor,
  DestructiveColor,
  PrimaryColor,
  SecondaryColor,
} from '@shared/theme/models/colors';
import { ColorSet } from '@shared/theme/models/ColorSet';
import { SimpleColor } from '@shared/theme/models/SimpleColor';

export class ThemeColors {
  default: ColorSet;
  primary: ColorSet;
  secondary: ColorSet;
  destructive: ColorSet;

  text: {
    strong: string;
    medium: string;
    light: string;
    disabled: string;
  };

  notify: {
    success: SimpleColor;
    info: SimpleColor;
    warning: SimpleColor;
    error: SimpleColor;
  };

  border: {
    main: string;
    dark: string;
    light: string;
    disabled: string;

    primary: string;
    secondary: string;
    destructive: string;
    error: string;
  };

  background: string;
  surface: string;

  constructor() {
    this.default = new DefaultColor();
    this.primary = new PrimaryColor();
    this.secondary = new SecondaryColor();
    this.destructive = new DestructiveColor();

    this.text = {
      strong: 'rgba(0, 0, 0, 0.87)',
      medium: 'rgba(0, 0, 0, 0.60)',
      light: 'rgba(0, 0, 0, 0.38)',
      disabled: 'rgba(0, 0, 0, 0.12)',
    };

    this.notify = {
      success: {
        main: 'rgb(67, 160, 71)',
        text: 'rgba(255, 255, 255, 0.87)',
      },
      info: {
        main: 'rgb(41, 121, 255)',
        text: 'rgba(255, 255, 255, 0.87)',
      },
      warning: {
        main: 'rgb(255, 238, 88)',
        text: 'rgba(0, 0, 0, 0.87)',
      },
      error: {
        main: 'rgb(176, 0, 32)',
        text: 'rgba(255, 255, 255, 0.87)',
      },
    };

    this.border = {
      main: 'rgb(117, 117, 117)',
      dark: 'rgb(33, 33, 33)',
      light: 'rgb(189, 189, 189)',
      disabled: 'rgba(0, 0, 0, 0.12)',

      primary: this.primary.main,
      secondary: this.secondary.main,
      destructive: this.destructive.main,
      error: this.notify.error.main,
    };

    this.background = 'rgb(255, 255, 255)';
    this.surface = 'rgb(250, 250, 250)';
  }
}
