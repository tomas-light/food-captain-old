import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect } from 'react';

import { Menu } from './models';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    table: {
      minWidth: 650,
    },
    hideLastBorder: {
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    },
  }),
);

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
    <Grid container direction="column">
      <Grid item>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>name</TableCell>
                <TableCell>author</TableCell>
                <TableCell>createDate</TableCell>
                <TableCell>lastUpdate</TableCell>
                <TableCell>dishes</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {menus.map((menu) => (
                <TableRow key={menu.name} className={classes.hideLastBorder}>
                  <TableCell component="th" scope="row">
                    {menu.id}
                  </TableCell>

                  <TableCell>
                    {menu.name}
                  </TableCell>

                  <TableCell>
                    {menu.author ? menu.author.name : '-'}
                  </TableCell>

                  <TableCell>
                    {menu.createDate}
                  </TableCell>

                  <TableCell>
                    {menu.lastUpdate}
                  </TableCell>

                  <TableCell>
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
                      ) : null }
                    {/*<ImageList className={classes.root}>
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
                    </ImageList>*/}
                      </TableCell>
                      </TableRow>
                      ))}
                  </TableBody>
                </Table>
                </TableContainer>
                </Grid>
                </Grid>
                );
              };

export type { MenuPageProps, MenuPageCallProps };
export { MenuPage };
