import { Observable, Subscription } from 'rxjs';

import {
  makeObservableOfCircles,
  makeObservableOfClickEventsOnDiv,
} from './observables';
import { euclideanDistance, ICircle } from './utils';

const UNHANDLED_MOUSE_EVENTS = [
  'contextmenu',
  'dblclick',
  'mousedown',
  'mouseenter',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
];

describe('makeObservableOfClickEventsOnDiv', () => {
  let anotherDiv: HTMLDivElement;
  let div: HTMLDivElement;
  let observable$: Observable<MouseEvent>;
  let observer0 = jest.fn();
  let observer1 = jest.fn();
  let subscription0: Subscription;
  let subscription1: Subscription;

  beforeAll(() => {
    anotherDiv = document.createElement('div');
    div = document.createElement('div');
    observable$ = makeObservableOfClickEventsOnDiv(div);
  });

  beforeEach(() => {
    subscription0 = observable$.subscribe(observer0);
    subscription1 = observable$.subscribe(observer1);
  });

  afterEach(() => {
    observer0.mockRestore();
    observer1.mockRestore();
    subscription0.unsubscribe();
    subscription1.unsubscribe();
  });

  it('notifies its observers when a click event is dispatched', () => {
    div.dispatchEvent(new MouseEvent('click'));
    expect(observer0).toHaveBeenCalledTimes(1);
    expect(observer1).toHaveBeenCalledTimes(1);
  });

  it('does not notify its observers when a click event is dispatched by another div', () => {
    anotherDiv.dispatchEvent(new MouseEvent('click'));
    expect(observer0).not.toHaveBeenCalled();
    expect(observer1).not.toHaveBeenCalled();
  });

  it('does not notify its observers when another mouse event is dispatched', () => {
    UNHANDLED_MOUSE_EVENTS.forEach(typeArg => {
      div.dispatchEvent(new MouseEvent(typeArg));
      expect(observer0).not.toHaveBeenCalled();
      expect(observer1).not.toHaveBeenCalled();
    });
  });
});

describe('makeObservableOfCircles', () => {
  let div: HTMLDivElement;
  let observable$: Observable<ICircle>;
  let observer0 = jest.fn();
  let observer1 = jest.fn();
  let subscription0: Subscription;
  let subscription1: Subscription;

  beforeAll(() => {
    div = document.createElement('div');
    observable$ = makeObservableOfCircles(div);
  });

  beforeEach(() => {
    subscription0 = observable$.subscribe(observer0);
    subscription1 = observable$.subscribe(observer1);
  });

  afterEach(() => {
    observer0.mockRestore();
    observer1.mockRestore();
    subscription0.unsubscribe();
    subscription1.unsubscribe();
  });

  it('notifies its observers each time a pair of click events is dispatched', () => {
    div.dispatchEvent(new MouseEvent('click'));
    div.dispatchEvent(new MouseEvent('click'));

    expect(observer0).toHaveBeenCalledTimes(1);
    expect(observer1).toHaveBeenCalledTimes(1);
  });

  it('calls its observers with a circle every time a pair of click events is dispatched', () => {
    const center = { x: 10, y: 20 };
    const p = { x: 20, y: 30 }; // some point on the circumference
    const r = euclideanDistance([center.x, center.y], [p.x, p.y]);

    div.dispatchEvent(
      new MouseEvent('click', { clientX: center.x, clientY: center.y })
    );
    div.dispatchEvent(new MouseEvent('click', { clientX: p.x, clientY: p.y }));

    const circle = { cx: center.x, cy: center.y, r };
    expect(observer0).toHaveBeenCalledWith(circle);
  });

  it('does not notify its observers when a single click event is dispatched', () => {
    div.dispatchEvent(new MouseEvent('click'));
    expect(observer0).not.toHaveBeenCalled();
    expect(observer1).not.toHaveBeenCalled();
  });

  it('does not notify its observers when another mouse event is dispatched', () => {
    UNHANDLED_MOUSE_EVENTS.forEach(typeArg => {
      div.dispatchEvent(new MouseEvent(typeArg));
      expect(observer0).not.toHaveBeenCalled();
      expect(observer1).not.toHaveBeenCalled();
    });
  });
});
