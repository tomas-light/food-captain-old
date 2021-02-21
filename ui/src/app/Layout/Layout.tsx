import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';

import { NotifierContainer } from '@Notifier';

const useStyles = makeStyles(theme => ({
  layout: {
    backgroundColor: theme.colors.background,
    height: '100vh',
    position: 'relative',
    display: 'grid',
    gridAutoColumns: '80px 1fr',
  },
  navbar: {
    height: '100%',
    display: 'grid',
  },
}));

const Layout: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <div className={classes.navbar}>
      </div>

      {children}

      <NotifierContainer/>
    </div>
  );
};

export { Layout };
