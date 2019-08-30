import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { map, pairwise } from 'rxjs/operators';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

import { Coords } from './types';
import {
  makeCircleFromPairClicks,
  makeTriangleFromTriplet,
  makeTripletOfClicks,
} from './utils';
import { Circle, Triangle } from './shapes';

const makeObservableOfClickEventsOnTarget = (
  eventTarget: FromEventTarget<MouseEvent>
): Observable<MouseEvent> => {
  return fromEvent(eventTarget, 'click');
};

export const makeObservableOfClickEventsOnDiv = (
  div: HTMLDivElement
): Observable<MouseEvent> => makeObservableOfClickEventsOnTarget(div);

export const makeObservableOfCircles = (
  div: HTMLDivElement
): Observable<Circle> => {
  return makeObservableOfClickEventsOnDiv(div).pipe(
    pairwise(),
    map(makeCircleFromPairClicks)
  );
};

export const makeObservableOfTriangles = (
  div: HTMLDivElement
): Observable<Triangle> => {
  return makeObservableOfClickEventsOnDiv(div).pipe(
    pairwise(),
    pairwise(),
    map(makeTripletOfClicks),
    map(makeTriangleFromTriplet)
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
