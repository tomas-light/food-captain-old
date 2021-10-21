import {
	ClassKeyOfStyles,
	CSSProperties,
	PropsOfStyles,
	StyledComponentProps,
	WithStyles,
} from '@mui/styles/withStyles/withStyles';
import { PropInjector } from '@mui/types';
import {
	makeStyles as muiMakeStyles,
	withStyles as muiWithStyles,
	ClassNameMap,
	Styles,
	WithStylesOptions,
	ThemeOfStyles,
} from '@shared/reexport';

import { AppTheme } from '@shared/theme/AppTheme';

function makeStyles<Props extends object = {}, ClassKey extends string = string>(
	styles: Styles<AppTheme, Props, ClassKey>,
	options?: Omit<WithStylesOptions<AppTheme>, 'withTheme'>
): keyof Props extends never
	? // `makeStyles` where the passed `styles` do not depend on props
	  (props?: any) => ClassNameMap<ClassKey>
	: // `makeStyles` where the passed `styles` do depend on props
	  (props: Props) => ClassNameMap<ClassKey> {
	return muiMakeStyles(styles, options);
}

function withStyles<
	ClassKey extends string = string,
	Props extends object = {},
	StylesType extends Styles<AppTheme, Props, ClassKey> = Styles<AppTheme, Props, ClassKey>,
	Options extends WithStylesOptions<ThemeOfStyles<StylesType>> = {}
>(
	style: StylesType,
	options?: Options
): PropInjector<
	WithStyles<StylesType, Options['withTheme']>,
	StyledComponentProps<ClassKeyOfStyles<StylesType>> & PropsOfStyles<StylesType>
> {
	return muiWithStyles(style, options);
}

export { makeStyles, withStyles };
export * from './AppTheme';
