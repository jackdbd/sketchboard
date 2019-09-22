import { BehaviorSubject, fromEvent, Observable, noop } from 'rxjs';
import {
  map,
  pairwise,
  mergeMap,
  takeUntil,
  tap,
  bufferCount,
} from 'rxjs/operators';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

import { Coords } from './types';
import {
  makeCircleFromPairClicks,
  makeTriangleFromTriplet,
  makeTripletOfClicks,
} from './utils';
import { Circle, Triangle } from './shapes';

export const makeObservableOfMouseEventOnTarget = (
  eventTarget: FromEventTarget<MouseEvent>,
  eventType: 'click' | 'mousedown' | 'mousemove'
): Observable<MouseEvent> => {
  return fromEvent(eventTarget, eventType);
};

export const makeObservableOfCircles = (
  click$: Observable<MouseEvent>
): Observable<Circle> => {
  return click$.pipe(
    pairwise(),
    map(makeCircleFromPairClicks)
  );
};

export const makeObservableOfTriangles = (
  click$: Observable<MouseEvent>
): Observable<Triangle> => {
  return click$.pipe(
    pairwise(),
    pairwise(),
    map(makeTripletOfClicks),
    map(makeTriangleFromTriplet)
  );
};

export const makeObservableOfCircleFeedback = (
  click$: Observable<MouseEvent>,
  mousedown$: Observable<MouseEvent>,
  mousemove$: Observable<MouseEvent>,
  debug?: boolean
): Observable<MouseEvent> => {
  const logEventOnlyInDebug = debug ? console.log : noop;

  const twoClicks$ = click$.pipe(
    bufferCount(2),
    tap(logEventOnlyInDebug)
  );

  // after mousedown, take mousemove events until the third click.

  return mousedown$.pipe(
    mergeMap(() => {
      return mousemove$;
    }),
    takeUntil(twoClicks$)
  );
};

export const makeObservableOfTriangleFeedback = (
  click$: Observable<MouseEvent>,
  mousedown$: Observable<MouseEvent>,
  mousemove$: Observable<MouseEvent>,
  debug?: boolean
): Observable<MouseEvent> => {
  const logEventOnlyInDebug = debug ? console.log : noop;

  const threeClicks$ = click$.pipe(
    bufferCount(3),
    tap(logEventOnlyInDebug)
  );

  // after mousedown, take mousemove events until the third click.
  return mousedown$.pipe(
    mergeMap(() => {
      return mousemove$;
    }),
    takeUntil(threeClicks$)
  );
};

interface State {
  circlesDrawn: number;
  clickCount: number;
  coordinates: Coords[];
  lastClick: Coords;
  trianglesDrawn: number;
}

const initialState: State = {
  circlesDrawn: 0,
  clickCount: 0,
  coordinates: [] as Coords[],
  lastClick: [0, 0] as Coords,
  trianglesDrawn: 0,
};

/**
 * BehaviorSubject that represents this component's state over time.
 *
 * @see http://reactivex.io/rxjs/manual/overview.html#behaviorsubject
 */
export const boardSubject$ = new BehaviorSubject<State>(initialState);
