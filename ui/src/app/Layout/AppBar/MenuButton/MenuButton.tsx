import { IconButton, StyledComponentProps, withStyles } from '@material-ui/core';
import { ChevronLeft, Menu } from '@material-ui/icons';
import React from 'react';

interface IMenuButtonProps {
  open: boolean;
}

interface IMenuButtonCallProps {
  toggle: () => void;
}

type Props = IMenuButtonProps & IMenuButtonCallProps & StyledComponentProps<MenuButtonClassKey>;

const MenuButton = (props: Props) => {
  const { classes, open, toggle } = props;

  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={toggle}
      className={classes.root}
    >
      {open
        ? (
          <ChevronLeft/>
        )
        : (
          <Menu/>
        )
      }
    </IconButton>
  );
};

type MenuButtonClassKey =
  | 'root'
  ;

const componentWithStyles = withStyles<MenuButtonClassKey>((theme) => ({
  root: {
    padding: 6,
  },
}), { name: 'MenuButton' })(MenuButton);
export { componentWithStyles as MenuButton };
