import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RouterActions } from '@app/routing';
import { Drawer, Props } from './Drawer';

type OwnProps = Omit<Props, 'redirect'>;
type CallProps = Pick<Props, 'redirect'>;

const mapDispatchToProps = (dispatch: Dispatch): CallProps => ({
  redirect: (url: string) => dispatch(RouterActions.redirect(url)),
});

const DrawerContainer: ComponentType<OwnProps> = connect(
  null,
  mapDispatchToProps
)(Drawer);
export { DrawerContainer };
