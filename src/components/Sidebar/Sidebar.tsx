import clsx from 'clsx';
import React from 'react';

import { Exports } from '../Exports';
import { InteractionsLogger } from '../InteractionsLogger';
import { ShapeSelect } from '../ShapeSelect';
import { ShapeStyleConfig } from '../ShapeStyleConfig';

export const DIV_CONTAINER_TEST_ID = 'sidebar-container-test-id';

export const Sidebar: React.FC<{}> = () => {
  return (
    <div className={clsx('stack')} data-testid={DIV_CONTAINER_TEST_ID}>
      <ShapeSelect />
      <ShapeStyleConfig />
      <Exports />
      <InteractionsLogger />
    </div>
  );
};
