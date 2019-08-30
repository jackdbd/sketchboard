import React from 'react';

import { InteractionsLogger } from '../InteractionsLogger';
import { Main } from '../Main';
import { Sidebar } from '../Sidebar';

import styles from './styles.module.css';

export const App: React.FC<{}> = () => {
  return (
    <div className={styles.app}>
      <Main />
      <Sidebar label={'Choose a shape to draw:'} />
      <InteractionsLogger />
    </div>
  );
};
