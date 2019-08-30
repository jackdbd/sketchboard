import { ICircle, ITriangle } from './shapes';
import { Coords, PairClicks, TripletClicks } from './types';

export const euclideanDistance = (p: Coords, q: Coords) => {
  const [x0, y0] = p;
  const [x1, y1] = q;
  return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
};

export const makeCircleFromPairClicks = (pair: PairClicks): ICircle => {
  const [ev0, ev1] = pair;
  const cx = ev0.clientX;
  const cy = ev0.clientY;
  const r = euclideanDistance([cx, cy], [ev1.clientX, ev1.clientY]);
  return { cx, cy, r };
};

export const makeTriangleFromTriplet = (triplet: TripletClicks): ITriangle => {
  const [ev0, ev1, ev2] = triplet;
  const p0 = { x: ev0.clientX, y: ev0.clientY };
  const p1 = { x: ev1.clientX, y: ev1.clientY };
  const p2 = { x: ev2.clientX, y: ev2.clientY };
  return { p0, p1, p2 };
};

export function coordinatesFromEvent(
  event: React.MouseEvent<HTMLElement, MouseEvent> | MouseEvent
): Coords {
  const domRect = (event.target as HTMLDivElement).getBoundingClientRect();
  const { clientX, clientY } = event;
  const x = clientX - domRect.left;
  const y = clientY - domRect.top;
  return [x, y];
}

export const makeTripletOfClicks = (events: [PairClicks, PairClicks]) => {
  const ev0 = events[0][0];
  const ev1 = events[0][1];
  const ev2 = events[1][1];
  const triplet = [ev0, ev1, ev2] as TripletClicks;
  return triplet;
};
