import { BehaviorSubject } from "rxjs";

// Available options for the shape picker.
export enum Option {
    BezierCurve = "Bezier Curve",
    Circle = "Circle",
    Triangle = "Triangle",
}

// Initial state of the Sidebar component.
const initialState = {
    dropdownChangesCount: 0,
    shape: Option.Circle,
};

/**
 * Observable that emits new values to all of its subscribers every time the
 * state of the Sidebar changes. It starts with an initial state.
 */
export const ShapePickerSubject = new BehaviorSubject(initialState);