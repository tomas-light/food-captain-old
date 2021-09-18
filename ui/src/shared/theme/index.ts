import { makeStyles as muiMakeStyles, withStyles as muiWithStyles } from '@material-ui/styles';
import { ClassNameMap, Styles, WithStylesOptions, } from '@material-ui/styles/withStyles';
import { ThemeOfStyles } from '@material-ui/styles/withStyles/withStyles';

import { AppTheme } from '@shared/theme/AppTheme';

function makeStyles<ClassKey extends string = string>(
  style: Styles<AppTheme, {}, ClassKey>,
  options?: Omit<WithStylesOptions<AppTheme>, 'withTheme'>
): (props?: any) => ClassNameMap<ClassKey>;
function makeStyles<Props extends object = {}, ClassKey extends string = string>(
  styles: Styles<AppTheme, Props, ClassKey>,
  options?: Omit<WithStylesOptions<AppTheme>, 'withTheme'>
): (props: Props) => ClassNameMap<ClassKey> {
  return muiMakeStyles(styles, options);
}

function withStyles<
  ClassKey extends string,
  Props extends object = {},
  Options extends WithStylesOptions<ThemeOfStyles<Styles<AppTheme, Props, ClassKey>>> = WithStylesOptions<ThemeOfStyles<Styles<AppTheme, Props, ClassKey>>>
  >(
  style: Styles<AppTheme, Props, ClassKey>,
  options?: Options
) {
  return muiWithStyles(style, options);
}


export { makeStyles, withStyles };
export * from './AppTheme';

