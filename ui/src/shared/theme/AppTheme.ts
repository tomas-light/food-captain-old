import { createTheme, Theme } from '@material-ui/core';

import { ThemeColors } from './models';
import { overrideMaterialUIPalette, overrideMaterialUIComponents } from './overrides';

// @ts-ignore
export class AppTheme implements Theme {
  colors: ThemeColors;
  drawerWidth: number;
  borderRadius: number;

  constructor() {
    this.colors = new ThemeColors();
    this.drawerWidth = 240;
    this.borderRadius = 6;

    const overriddenPalette = overrideMaterialUIPalette(this.colors);
    const overriddenComponents = overrideMaterialUIComponents(this.colors);

    const muiTheme = createTheme({
      palette: overriddenPalette,
      components: overriddenComponents,
    });

    Object.assign(this, muiTheme);
  }
}
