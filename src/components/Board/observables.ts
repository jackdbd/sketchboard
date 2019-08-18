import { BehaviorSubject, fromEvent } from 'rxjs';
import { map, pairwise } from 'rxjs/operators';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

import { Coords } from './types';
import { makeCircleFromPairClicks } from './utils';

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

// Initial state of the Board component.
const initialState = {
  clickCount: 0,
  coordinates: [] as Coords[],
  lastClick: [0, 0] as Coords,
};

/**
 * Observable that emits new values to all of its subscribers every time the
 * state of the Board changes. It starts with an initial state.
 */
export const BoardSubject = new BehaviorSubject(initialState);
