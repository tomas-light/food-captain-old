import {
  createMuiTheme,
  Direction,
  Theme,
  Transitions,
} from '@material-ui/core';
import { Components } from '@material-ui/core/styles/components';
import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';
import { Mixins } from '@material-ui/core/styles/createMixins';
import { Palette } from '@material-ui/core/styles/createPalette';
import { Spacing } from '@material-ui/core/styles/createSpacing';
import { Typography } from '@material-ui/core/styles/createTypography';
import { Shadows } from '@material-ui/core/styles/shadows';
import { Shape } from '@material-ui/core/styles/shape';
import { ZIndex } from '@material-ui/core/styles/zIndex';

import { ThemeColors } from './models';
import { overrideMaterialUIPalette, overrideMaterialUIComponents } from './overrides';

export class AppTheme implements Theme {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  mixins: Mixins;
  components?: Components;
  palette: Palette;
  shadows: Shadows;
  spacing: Spacing;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;

  colors: ThemeColors;
  drawerWidth: number;
  borderRadius: number;

  constructor() {
    this.colors = new ThemeColors();
    this.drawerWidth = 240;
    this.borderRadius = 6;

    const overriddenPalette = overrideMaterialUIPalette(this.colors);
    const overriddenComponents = overrideMaterialUIComponents(this.colors);

    const muiTheme = createMuiTheme({
      palette: overriddenPalette,
      components: overriddenComponents,
    });

    this.shape = muiTheme.shape;
    this.breakpoints = muiTheme.breakpoints;
    this.direction = muiTheme.direction;
    this.mixins = muiTheme.mixins;
    this.components = muiTheme.components;
    this.palette = muiTheme.palette;
    this.shadows = muiTheme.shadows;
    this.spacing = muiTheme.spacing;
    this.transitions = muiTheme.transitions;
    this.typography = muiTheme.typography;
    this.zIndex = muiTheme.zIndex;
  }
}
