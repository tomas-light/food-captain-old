// provide our theme type

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import {
  ClassNameMap,
  StyledComponentProps,
  Styles,
  WithStylesOptions,
} from '@material-ui/styles/withStyles';
import { Omit, PropInjector } from '@material-ui/types';

import { AppTheme } from './AppTheme';

declare module '@material-ui/core' {
  /**
   * `makeStyles` where the passed `styles` do not depend on props
   */
  function makeStyles<ClassKey extends string = string>(
    // eslint-disable-next-line @typescript-eslint/ban-types
    style: Styles<AppTheme, {}, ClassKey>,
    options?: Omit<WithStylesOptions<AppTheme>, 'withTheme'>
  ): (props?: any) => ClassNameMap<ClassKey>;
  /**
   * `makeStyles` where the passed `styles` do depend on props
   */
  function makeStyles<
    // eslint-disable-next-line @typescript-eslint/ban-types
    Props extends any = {},
    ClassKey extends string = string
    >(
    styles: Styles<AppTheme, Props, ClassKey>,
    options?: Omit<WithStylesOptions<AppTheme>, 'withTheme'>
  ): (props: Props) => ClassNameMap<ClassKey>;

  function withStyles<
    ClassKey extends string,
    Options extends WithStylesOptions<Theme>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    Props extends any = {}
    >(
    style: Styles<AppTheme, Props, ClassKey>,
    options?: Options
  ): PropInjector<WithStyles<ClassKey, Options['withTheme']>, StyledComponentProps<ClassKey> & Props>;

  function withStyles<
    ClassKey extends string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    Props extends any = {}
    >(
    style: Styles<AppTheme, Props, ClassKey>,
    options?: WithStylesOptions<AppTheme>
  ): PropInjector<WithStyles<ClassKey, WithStylesOptions<AppTheme>['withTheme']>, StyledComponentProps<ClassKey> & Props>;

  function useTheme(): AppTheme;
}
