import { BehaviorSubject, fromEvent } from "rxjs";
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";

const makeObservableOfClickEventsOnTarget = (eventTarget: FromEventTarget<MouseEvent>) => {
    return fromEvent(eventTarget, "click");
}

export const makeObservableOfClickEventsOnDiv = (div: HTMLDivElement) => makeObservableOfClickEventsOnTarget(div);

// Initial state of the Board component.
const initialState = {
    clickCount: 0
}

/**
 * Observable that emits new values to all of its subscribers every time the
 * state of the Board changes. It starts with an initial state.
 */
export const BoardSubject = new BehaviorSubject(initialState);
