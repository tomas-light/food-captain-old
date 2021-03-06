import { makeStyles } from '@material-ui/core';

export type TypographyClassNameKeys =
  | 'root'
  | 'noWrap'
  | 'bold'
  ;

export const useTypographyStyles = makeStyles<TypographyClassNameKeys>({
  root: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  },
  bold: {
    fontWeight: 'bold',
  },
});
