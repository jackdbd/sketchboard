import React from 'react';

import { useSharedState } from '../../hooks';
import { Board, boardSubject$ } from '../Board';
import { ErrorBoundary } from '../ErrorBoundary';
import { EventsList } from '../EventsList';

import styles from './styles.module.css';

export const Main: React.FC<{}> = () => {
  const [{ coordinates }] = useSharedState(boardSubject$);
  return (
    <div className={styles.main}>
      <ErrorBoundary debug={true}>
        <Board />
      </ErrorBoundary>
      <EventsList coordinates={coordinates} />
    </div>
  );
};
