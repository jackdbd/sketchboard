import { BehaviorSubject } from 'rxjs';

export enum ShapeOption {
  BezierCurve = 'Bezier Curve',
  Circle = 'Circle',
  Rectangle = 'Rectangle',
  Triangle = 'Triangle',
}

interface IState {
  dropdownChangesCount: number;
  shape: ShapeOption;
}

export const initialState: IState = {
  dropdownChangesCount: 0,
  shape: ShapeOption.Circle,
};

/**
 * BehaviorSubject that represents this component's state over time.
 *
 * @see http://reactivex.io/rxjs/manual/overview.html#behaviorsubject
 */
export const shapePickerSubject$ = new BehaviorSubject<IState>(initialState);
