import { BehaviorSubject, fromEvent } from 'rxjs';
import { map, pairwise } from 'rxjs/operators';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

import { Coords } from './types';
import {
  makeCircleFromPairClicks,
  makeTriangleFromTriplet,
  makeTripletOfClicks,
} from './utils';

const makeObservableOfClickEventsOnTarget = (
  eventTarget: FromEventTarget<MouseEvent>
) => {
  return fromEvent(eventTarget, 'click');
};

export const makeObservableOfClickEventsOnDiv = (div: HTMLDivElement) =>
  makeObservableOfClickEventsOnTarget(div);

export const makeObservableOfCircles = (div: HTMLDivElement) => {
  return makeObservableOfClickEventsOnDiv(div).pipe(
    pairwise(),
    map(makeCircleFromPairClicks)
  );
};

export const makeObservableOfTriangles = (div: HTMLDivElement) => {
  return makeObservableOfClickEventsOnDiv(div).pipe(
    pairwise(),
    pairwise(),
    map(makeTripletOfClicks),
    map(makeTriangleFromTriplet)
  );
};

interface IState {
  circlesDrawn: number;
  clickCount: number;
  coordinates: Coords[];
  lastClick: Coords;
  trianglesDrawn: number;
}

const initialState: IState = {
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
export const boardSubject$ = new BehaviorSubject<IState>(initialState);
