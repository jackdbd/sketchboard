import React, { useEffect, useRef } from 'react';
import { fromEvent } from 'rxjs';
import { map, pairwise, tap } from 'rxjs/operators';

import { useSharedState } from '../../hooks';
import { BoardSubject } from './observables';
import {
  makeCircleFromPairClicks,
  makeTriangleFromTriplet,
  PairClicks,
  TripletClicks,
} from './observers';
import { Coordinates } from './types';

import styles from './styles.module.css';

export const TEST_ID_CONTAINER = 'board-container-test-id';
export const TEST_ID_SVG = 'board-svg-test-id';

function coordinatesFromEvent(
  event: React.MouseEvent<HTMLElement, MouseEvent> | MouseEvent
): Coordinates {
  const domRect = (event.target as HTMLDivElement).getBoundingClientRect();
  const { clientX, clientY } = event;
  const x = clientX - domRect.left;
  const y = clientY - domRect.top;
  return [x, y];
}

const makeTripletOfClicks = (events: [PairClicks, PairClicks]) => {
  const ev0 = events[0][0];
  const ev1 = events[0][1];
  const ev2 = events[1][1];
  const triplet = [ev0, ev1, ev2] as TripletClicks;
  return triplet;
};

export const Board: React.FC = () => {
  const [
    { clickCount, coordinates, lastClick },
    setSharedState,
  ] = useSharedState(BoardSubject);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      throw new Error('ASSERT: ref NOT ready!');
    }

    const observableOfClicks = fromEvent<MouseEvent>(ref.current, 'click');
    const observableOfPairClicks = observableOfClicks.pipe(pairwise());
    const subscriptionOnCircles = observableOfPairClicks.subscribe(
      makeCircleFromPairClicks
    );

    const observableOfTripletClicks = observableOfClicks.pipe(
      pairwise(),
      pairwise(),
      map(makeTripletOfClicks),
      tap((triplet: TripletClicks) => {
        setSharedState({
          clickCount,
          coordinates,
          lastClick: [...coordinatesFromEvent(triplet[0])],
        });
      })
    );
    const subscriptionOnTriangles = observableOfTripletClicks.subscribe(
      makeTriangleFromTriplet
    );

    return () => {
      subscriptionOnCircles.unsubscribe();
      subscriptionOnTriangles.unsubscribe();
    };
  }, [ref]);

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const [x, y] = coordinatesFromEvent(event);
    setSharedState({
      clickCount: clickCount + 1,
      coordinates: [...coordinates, [x, y]] as Coordinates[],
      lastClick: [x, y] as Coordinates,
    });
  };

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const [x, y] = coordinatesFromEvent(event);
    const lc: Coordinates = coordinates.length
      ? coordinates[coordinates.length - 1]
      : [0, 0];
    setSharedState({
      clickCount,
      coordinates: [...coordinates, [x, y]] as Coordinates[],
      lastClick: lc,
    });
  };

  return (
    <div
      className={styles.board}
      data-testid={TEST_ID_CONTAINER}
      onClick={onClick}
      onMouseMove={onMouseMove}
      ref={ref}
    >
      <div className={styles.inner}>
        <svg
          className={styles['svg-board']}
          data-testid={TEST_ID_SVG}
          width="100%"
          height="100%"
        >
          <circle
            cx={lastClick[0]}
            cy={lastClick[1]}
            r="40"
            stroke="black"
            strokeWidth="3"
            fill={'steelblue'}
          />
          <text
            className={styles['circle-center']}
            x={lastClick[0]}
            y={lastClick[1]}
          >
            {`x: ${lastClick[0]}; y: ${lastClick[1]}`}
          </text>
        </svg>
      </div>
    </div>
  );
};
