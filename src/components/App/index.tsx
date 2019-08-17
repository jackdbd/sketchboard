import React from 'react';

import { useSharedState } from '../../hooks';
import { Main } from '../Main';
import { BoardSubject } from '../Board';
import { ShapePickerSubject, Sidebar } from '../Sidebar';

import styles from './styles.module.css';

export const App = () => {
  const [{ dropdownChangesCount }] = useSharedState(ShapePickerSubject);
  const [{ lastClick }] = useSharedState(BoardSubject);

  return (
    <div className={styles.app}>
      <Main />
      <Sidebar label={'Choose a shape to draw:'} />
      <div style={{ outline: '0.2rem solid orange' }}>
        <p>{`Dropdown changed ${dropdownChangesCount} times`}</p>
        <p>{`Last click coordinates ${lastClick}`}</p>
      </div>
    </div>
  );
};
