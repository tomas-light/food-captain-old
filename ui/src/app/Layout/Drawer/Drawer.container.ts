import { push } from 'connected-react-router';
import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Drawer, DrawerCallProps, DrawerProps } from './Drawer';

const mapDispatchToProps = (dispatch: Dispatch): DrawerCallProps => ({
  redirect: (url: string) => dispatch(push(url)),
});

const DrawerContainer: ComponentType<DrawerProps> = connect(
  null,
  mapDispatchToProps
)(Drawer);
export { DrawerContainer };
