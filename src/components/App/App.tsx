import React from 'react';

import { Main } from '../Main';
import { Sidebar } from '../Sidebar';
import { SidebarLayout } from '../SidebarLayout';

export const App: React.FC<{}> = () => {
  return (
    <SidebarLayout side={'right'}>
      <Main />
      <Sidebar />
    </SidebarLayout>
  );
};
