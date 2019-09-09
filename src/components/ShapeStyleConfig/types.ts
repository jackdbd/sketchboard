export enum DashArray {
  Three = '3',
  Four = '4',
  FiveTen = '5 10',
  Odd = '4 1 2',
  Even = '4 1 2 3',
  Other = '20 10 5 5 5 10',
}

export interface ShapeStyleConfigState {
  fill?: string;
  opacity?: string;
  stroke?: string;
  'stroke-opacity'?: string;
  'stroke-dasharray'?: DashArray;
  'stroke-width'?: string;
}
