import { BehaviorSubject } from 'rxjs';

export enum ShapeOption {
  BezierCurve = 'Bezier Curve',
  Circle = 'Circle',
  Rectangle = 'Rectangle',
  Triangle = 'Triangle',
}

interface State {
  dropdownChangesCount: number;
  shape: ShapeOption;
}

export const initialState: State = {
  dropdownChangesCount: 0,
  shape: ShapeOption.Circle,
};

/**
 * BehaviorSubject that represents this component's state over time.
 *
 * @see http://reactivex.io/rxjs/manual/overview.html#behaviorsubject
 */
export const shapePickerSubject$ = new BehaviorSubject<State>(initialState);
