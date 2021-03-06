import React, { useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { Menu } from '@models';
import { MenuTableContainer } from './MenuTable';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 40,
  },
}));

interface MenuPageProps {
  menus: Menu[];
}

interface MenuPageCallProps {
  loadMenu: () => void;
}

type Props = MenuPageProps & MenuPageCallProps

const MenuPage = (props: Props) => {
  const { menus, loadMenu } = props;
  const classes = useStyles();

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <MenuTableContainer/>
        {/*
            {menu.dishes && menu.dishes.length ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>name</TableCell>
                    <TableCell>description</TableCell>
                    <TableCell>image</TableCell>
                    <TableCell>order</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {menu.dishes.map((dish) => (
                    <TableRow key={dish.id} className={classes.hideLastBorder}>
                      <TableCell>
                        {dish.id}
                      </TableCell>

                      <TableCell>
                        {dish.name}
                      </TableCell>

                      <TableCell>
                        {dish.description}
                      </TableCell>

                      <TableCell>
                        {dish.image ? dish.image : '-'}
                      </TableCell>

                      <TableCell>
                        {dish.order ? dish.order : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : null}

            <ImageList className={classes.root}>
              {menu.dishes?.map((dish) => (
                <ImageListItem key={dish.id}>
                  <img src={dish.image} alt={dish.name}/>

                  <ImageListItemBar
                    title={dish.name}
                    subtitle={(
                      <span>
                        by: {dish.description}
                      </span>
                    )}
                    actionIcon={
                      <IconButton aria-label={`info about ${dish.name}`} className={classes.icon}>
                        <InfoIcon/>
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ))}
        */}
      </Grid>
    </Grid>
  );
};

export type { MenuPageProps, MenuPageCallProps };
export { MenuPage };
