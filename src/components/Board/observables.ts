import { fromEvent } from "rxjs";
import { FromEventTarget } from "rxjs/internal/observable/fromEvent";

const makeObservableOfClickEventsOnTarget = (eventTarget: FromEventTarget<MouseEvent>) => {
    return fromEvent(eventTarget, "click");
}

export const makeObservableOfClickEventsOnDiv = (div: HTMLDivElement) => makeObservableOfClickEventsOnTarget(div);
