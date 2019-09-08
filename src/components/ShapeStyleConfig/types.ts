export enum DashArray {
  One = '5,5',
  Two = '10,10',
  Three = '20,10,5,5,5,10',
}

export interface ShapeStyleConfigState {
  fill?: string;
  opacity?: string;
  stroke?: string;
  'stroke-opacity'?: string;
  'stroke-dasharray'?: DashArray;
  'stroke-width'?: string;
}
