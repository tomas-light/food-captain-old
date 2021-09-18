import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@shared/theme';

import { MenuTableContainer } from './MenuTable';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 40,
  },
}));

interface Props {
  loadMenu: () => void;
}

const MenuPage = (props: Props) => {
  const { loadMenu } = props;
  const classes = useStyles();

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <MenuTableContainer/>
      </Grid>
    </Grid>
  );
};

export type { Props };
export { MenuPage };
