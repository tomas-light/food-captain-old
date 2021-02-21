import React, { FC, useState } from 'react';

import { SpinnerBlock } from '@shared/molecules';

export interface AppInitterProps {
  initialized: boolean;
}

export interface AppInitterCallProps {
  initialize: () => void;
}

type Props = AppInitterProps & AppInitterCallProps;

const AppInitter: FC<Props> = props => {
  const {
    initialized,
    initialize,
    children,
  } = props;

  useState(() => {
    initialize();
  });

  if (!initialized) {
    return (
      <SpinnerBlock visible/>
    );
  }

  return (
    <>
      {children}
    </>
  );
};

export { AppInitter };
