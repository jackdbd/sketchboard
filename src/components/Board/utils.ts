import { Coords, PairClicks, TripletClicks } from './types';

export interface ICircle {
  cx: number;
  cy: number;
  r: number;
}

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

export const makeTriangleFromTriplet = (triplet: TripletClicks) => {
  const [ev0, ev1, ev2] = triplet;
  const a = { x: ev0.clientX, y: ev0.clientY };
  const b = { x: ev1.clientX, y: ev1.clientY };
  const c = { x: ev2.clientX, y: ev2.clientY };
  return { a, b, c };
};

// TODO: use d3?
export const addCircleToBoard = (svg: SVGSVGElement, c: ICircle) => {
  const svgNS = svg.namespaceURI;
  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', `${c.cx}`);
  circle.setAttribute('cy', `${c.cy}`);
  circle.setAttribute('r', `${c.r}`);
  circle.setAttribute('fill', 'red');
  circle.setAttribute('stroke', 'black');
  circle.setAttribute('stroke-width', '20px');
  circle.setAttribute('stroke-opacity', '0.5');
  svg.appendChild(circle);
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
