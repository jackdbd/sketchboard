import React, { useEffect, useRef } from 'react';
import { map, pairwise, tap } from 'rxjs/operators';

import { useSharedState } from '../../hooks';
import {
  BoardSubject,
  makeObservableOfCircles,
  makeObservableOfClickEventsOnDiv,
} from './observables';
import {
  addCircleToBoard,
  coordinatesFromEvent,
  ICircle,
  makeTriangleFromTriplet,
  makeTripletOfClicks,
} from './utils';

import styles from './styles.module.css';
import { Coords, TripletClicks } from './types';

export const TEST_ID_CONTAINER = 'board-container-test-id';
export const TEST_ID_SVG = 'board-svg-test-id';

const REF_NOT_READY = 'ASSERT: ref NOT ready!';

export const Board: React.FC = () => {
  const [
    { clickCount, coordinates, lastClick },
    setSharedState,
  ] = useSharedState(BoardSubject);

  const refDiv = useRef<HTMLDivElement>(null);
  const refSvg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!refDiv.current) {
      throw new Error(REF_NOT_READY);
    }

    // TODO: make another useEffect?
    if (!refSvg.current) {
      throw new Error(REF_NOT_READY);
    }

    const observableOfCircles = makeObservableOfCircles(refDiv.current);

    const observerOfCircles = (c: ICircle) => {
      if (!refSvg.current) {
        throw new Error(REF_NOT_READY);
      }
      const svg = refSvg.current;
      addCircleToBoard(svg, c);
      setSharedState({
        clickCount: clickCount + 1,
        coordinates,
        lastClick: [c.cx, c.cy] as Coords,
      });
    };

    const subscriptionOnCircles = observableOfCircles.subscribe(
      observerOfCircles
    );

    const observableOfClicks = makeObservableOfClickEventsOnDiv(refDiv.current);

    // TODO: make this observable side-effects free and perform side effects in the observer?
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
  }, [refDiv, refSvg]);

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const [x, y] = coordinatesFromEvent(event);
    setSharedState({
      clickCount: clickCount + 1,
      coordinates: [...coordinates, [x, y]] as Coords[],
      lastClick: [x, y] as Coords,
    });
  };

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const [x, y] = coordinatesFromEvent(event);
    const lc: Coords = coordinates.length
      ? coordinates[coordinates.length - 1]
      : [0, 0];
    setSharedState({
      clickCount,
      coordinates: [...coordinates, [x, y]] as Coords[],
      lastClick: lc,
    });
  };

  return (
    <div
      className={styles.board}
      data-testid={TEST_ID_CONTAINER}
      onClick={onClick}
      onMouseMove={onMouseMove}
      ref={refDiv}
    >
      <div className={styles.inner}>
        <svg
          className={styles['svg-board']}
          data-testid={TEST_ID_SVG}
          height="100%"
          ref={refSvg}
          width="100%"
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
