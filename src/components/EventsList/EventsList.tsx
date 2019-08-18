import React from 'react';

import { Coords } from '../Board/types';

import styles from './styles.module.css';

interface IProps {
  coordinates: Coords[];
}

export const EventsList: React.FC<IProps> = props => {
  const { coordinates } = props;
  return (
    <div className={styles['event-list']}>
      <p>{`Got ${coordinates.length} coordinates`}</p>
      <ol>
        {coordinates.map((c, i) => (
          <li key={`${c[0]}-${c[1]}-${i}`}>{`x: ${c[0]}; y: ${c[1]}`}</li>
        ))}
      </ol>
    </div>
  );
};
