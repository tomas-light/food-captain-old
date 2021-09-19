import clsx from 'clsx';
import { Drawer as MuiDrawer, List, ListItem, ListItemText } from '@material-ui/core';

import { appUrls } from '@app/routing/appUrls';
import { makeStyles } from '@shared/theme';

const menuItems = [
  {
    title: 'Menus',
    url: appUrls.menu,
  }
];

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.drawerWidth,
    position: 'relative',
    // transition: theme.transitions.create(['width'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
  },
  closed: {
    width: 0,
  },
}));

type Props = {
  className: string;
  open: boolean;
  redirect: (url: string) => void;
}

const Drawer = (props: Props) => {
  const { className, open, redirect } = props;

  const classes = useStyles();
  const handleRedirect = (url: string) => () => {
    redirect(url);
  };

  return (
    <MuiDrawer
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        root: clsx(classes.drawer, className),
        paper: clsx(classes.drawerPaper,{
          [classes.closed]: !open
        }),
      }}
    >
      <List>
        {menuItems.map(item => (
          <ListItem button key={item.title} onClick={handleRedirect(item.url)}>
            <ListItemText primary={item.title}/>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export type { Props };
export { Drawer };
