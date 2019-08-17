export type PairClicks = [MouseEvent, MouseEvent];
export type TripletClicks = [MouseEvent, MouseEvent, MouseEvent];

/**
 * An observer that every time it receives a pair of click events, produces
 * the attributes required to draw a circle.
 */
export const makeCircleFromPairClicks = (pair: PairClicks) => {
  const [ev0, ev1] = pair;
  const cx = ev0.clientX;
  const cy = ev0.clientY;
  const x = ev1.clientX;
  const y = ev1.clientY;
  const r = Math.sqrt(
    Math.pow(Math.abs(x - cx), 2) + Math.pow(Math.abs(y - cy), 2)
  );
  const circle = { cx, cy, r };
  console.warn('circle', circle);
};

/**
 * An observer that every time it receives a triplet of click events, produces
 * the attributes required to draw a triangle.
 */
export const makeTriangleFromTriplet = (triplet: TripletClicks) => {
  const [ev0, ev1, ev2] = triplet;
  const a = { x: ev0.clientX, y: ev0.clientY };
  const b = { x: ev1.clientX, y: ev1.clientY };
  const c = { x: ev2.clientX, y: ev2.clientY };
  const triangle = { a, b, c };
  console.warn('triangle', triangle);
};
