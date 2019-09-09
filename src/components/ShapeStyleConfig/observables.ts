import { BehaviorSubject } from 'rxjs';

import { ShapeStyleConfigState as State } from './types';

export const initialState: State = {
  fill: '#FF5722',
  opacity: '1',
  stroke: '#6A1B9A',
  'stroke-dasharray': undefined,
  'stroke-opacity': '1',
  'stroke-width': '10px',
};

export const shapeStyleConfigSubject$ = new BehaviorSubject<State>(
  initialState
);
