import {
	createTheme,
	Theme,
	Breakpoints,
	Direction,
	Mixins,
	Palette,
	Shadows,
	Shape,
	Spacing,
	Transitions,
	TypographyType,
	ZIndex,
} from '@shared/reexport';

import { ThemeColors } from './models';
import { overrideMaterialUIPalette, overrideMaterialUIComponents } from './overrides';

export class AppTheme implements Theme {
	colors: ThemeColors;
	drawerWidth: number;
	borderRadius: number;
	breakpoints: Breakpoints;
	direction: Direction;
	mixins: Mixins;
	palette: Palette;
	shadows: Shadows;
	shape: Shape;
	spacing: Spacing;
	transitions: Transitions;
	typography: TypographyType;
	zIndex: ZIndex;

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
