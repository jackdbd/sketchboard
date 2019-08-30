import React from 'react';

import { useSharedState } from '../../hooks';
import { Board, boardSubject$ } from '../Board';
import { EventsList } from '../EventsList';

import styles from './styles.module.css';

// type PairClicks = [MouseEvent, MouseEvent];
// type TripletClicks = [MouseEvent, MouseEvent, MouseEvent];

// const makeTripletOfClicks = (events: [PairClicks, PairClicks]) => {
//   const ev0 = events[0][0];
//   const ev1 = events[0][1];
//   const ev2 = events[1][1];
//   const triplet = [ev0, ev1, ev2] as TripletClicks;
//   return triplet;
// };

// const observableOfTripletClicks = observableOfClicks.pipe(
//   pairwise(),
//   pairwise(),
//   map(makeTripletOfClicks)
// );

export const Main: React.FC<{}> = () => {
  const [{ coordinates }] = useSharedState(boardSubject$);
  return (
    <div className={styles.main}>
      <Board />
      <EventsList coordinates={coordinates} />
    </div>
  );
};
