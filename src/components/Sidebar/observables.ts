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
 * Observable that emits new values to all of its subscribers every time the
 * state of the React component where this observable is used changes.
 */
export const shapePickerSubject$ = new BehaviorSubject<IState>(initialState);
