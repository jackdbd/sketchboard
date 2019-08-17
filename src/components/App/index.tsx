import React from 'react';

import { Board, BoardSubject } from '../Board';
import { ShapePickerSubject, Sidebar } from '../Sidebar';

import { useSharedState } from '../../hooks';
import styles from './styles.module.css';

export const App = () => {
  const [{ clickCount }] = useSharedState(BoardSubject);
  const [{ dropdownChangesCount }] = useSharedState(ShapePickerSubject);
  return (
    <div className={styles.app}>
      <Board text={'Board'} />
      <Sidebar label={'Choose a shape to draw:'} />
      <p>{`Board was clicked ${clickCount} times`}</p>
      <p>{`Dropdown changed ${dropdownChangesCount} times`}</p>
    </div>
  );
};
