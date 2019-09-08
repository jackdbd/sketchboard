import { BehaviorSubject } from 'rxjs';

import { ShapeStyleConfigState as State } from './types';

export const initialState: State = {
  fill: '#FF5722',
  stroke: '#6A1B9A',
  'stroke-dasharray': undefined,
  'stroke-opacity': undefined,
  'stroke-width': '10px',
};

export const shapeStyleConfigSubject$ = new BehaviorSubject<State>(
  initialState
);