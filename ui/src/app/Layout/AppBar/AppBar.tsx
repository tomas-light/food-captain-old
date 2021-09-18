import { MenuButton } from '@app/Layout/AppBar/MenuButton';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@shared/theme';
import clsx from 'clsx';
import React, { FC } from 'react';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#FFF',
    color: '#000',
    justifySelf: 'end',
    borderBottomColor: '#BDBDBD',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },

  toolbar: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateAreas: `"menu . title . name"`,
    gridTemplateColumns: '36px 6px auto 1fr auto',
    paddingLeft: 22,
    paddingRight: 22,
  },
  menu: {
    gridArea: 'menu',
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.borderRadius,
  },
  title: {
    gridArea: 'title',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: '21px',
    color: theme.colors.primary.text,
  },
  name: {
    gridArea: 'name',
    fontSize: 14,
    lineHeight: '16px',
    color: theme.colors.primary.text,
  },
}));

interface AppBarProps {
  open: boolean;
  title?: string;
  userName?: string;
  className?: string;
  elevation?: number;
}

interface AppBarCallProps {
  toggle: () => void;
}

type Props = AppBarProps & AppBarCallProps;

const AppBar: FC<Props> = (props) => {
  const {
    open,
    title = 'Food captain',
    userName = 'no name',
    className,
    children,
    toggle,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <MuiAppBar
      position="relative"
      className={clsx(classes.appBar, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <MenuButton
          open={open}
          toggle={toggle}
          classes={{ root: classes.menu }}
        />

        <Typography
          variant="h6"
          noWrap
          className={classes.title}
        >
          {title}
        </Typography>

        {/*<Typography
          variant="body1"
          noWrap
          className={classes.name}
        >
          {userName}
        </Typography>*/}
      </Toolbar>
    </MuiAppBar>
  );
};

export { AppBar };
