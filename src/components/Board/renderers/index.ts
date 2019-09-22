import { Circle, Point, Triangle } from '../shapes';
import { ShapeStyleConfigState } from '../../ShapeStyleConfig/types';
import { initialState as initialShapeStyleConfigState } from '../../ShapeStyleConfig/observables';

const NAMESPACE_URI = 'http://www.w3.org/2000/svg';

const CIRCLE_FEEDBACK_ID = 'circle-feedback';
const POLYGON_FEEDBACK_ID = 'polygon-feedback';

const setStyleAttributes = <T extends SVGElement>(
  el: T,
  config: ShapeStyleConfigState = initialShapeStyleConfigState
): void => {
  el.setAttribute('fill', config.fill || '');
  el.setAttribute('opacity', config.opacity || '');
  el.setAttribute('stroke', config.stroke || '');
  el.setAttribute('stroke-dasharray', config['stroke-dasharray'] || '');
  el.setAttribute('stroke-opacity', config['stroke-opacity'] || '');
  el.setAttribute('stroke-width', config['stroke-width'] || '');
};

const makeSVGCircle = (
  c: Circle,
  config?: ShapeStyleConfigState,
  id?: string
): SVGCircleElement => {
  const circle = document.createElementNS(NAMESPACE_URI, 'circle');
  circle.setAttribute('cx', `${c.cx}`);
  circle.setAttribute('cy', `${c.cy}`);
  circle.setAttribute('r', `${c.r}`);
  setStyleAttributes(circle, config);
  if (id) {
    circle.setAttribute('id', id);
  }
  return circle;
};

export const cleanupCircleFeedbackInSVG = (svg: SVGSVGElement): void => {
  const el = document.querySelector(`#${CIRCLE_FEEDBACK_ID}`);
  if (el) {
    svg.removeChild(el);
  }
};

export const renderCircleInSVG = (
  svg: SVGSVGElement,
  circle: Circle,
  config?: ShapeStyleConfigState,
  id?: string
): void => {
  svg.appendChild(makeSVGCircle(circle, config, id));
};

const updateCircleInSVG = (
  el: SVGCircleElement,
  c: Circle,
  config?: ShapeStyleConfigState
): void => {
  el.setAttribute('cx', `${c.cx}`);
  el.setAttribute('cy', `${c.cy}`);
  el.setAttribute('r', `${c.r}`);
  setStyleAttributes(el, config);
};

// TODO: render a dashed line connecting the center and the current mousemove event coordinates
export const renderCircleFeedbackInSVG = (
  svg: SVGSVGElement,
  circle: Circle,
  config?: ShapeStyleConfigState
): void => {
  const el = document.querySelector(`#${CIRCLE_FEEDBACK_ID}`);
  if (el) {
    updateCircleInSVG(el as SVGCircleElement, circle, config);
  } else {
    renderCircleInSVG(svg, circle, config, CIRCLE_FEEDBACK_ID);
  }
};

const makeSVGTriangle = (
  triangle: Triangle,
  config?: ShapeStyleConfigState
): SVGPolygonElement => {
  const { p0, p1, p2 } = triangle;
  const polygon = document.createElementNS(NAMESPACE_URI, 'polygon');
  polygon.setAttribute(
    'points',
    `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y}`
  );
  setStyleAttributes(polygon, config);
  return polygon;
};

export const renderTriangleInSVG = (
  svg: SVGSVGElement,
  triangle: Triangle,
  config?: ShapeStyleConfigState
): void => {
  svg.appendChild(makeSVGTriangle(triangle, config));
};

const makeSVGLine = (
  p0: Point,
  p1: Point,
  config?: ShapeStyleConfigState,
  id?: string
): SVGLineElement => {
  const line = document.createElementNS(NAMESPACE_URI, 'line');
  line.setAttribute('x1', `${p0.x}`);
  line.setAttribute('y1', `${p0.y}`);
  line.setAttribute('x2', `${p1.x}`);
  line.setAttribute('y2', `${p1.y}`);
  setStyleAttributes(line, config);
  if (id) {
    line.setAttribute('id', id);
  }
  return line;
};

export const renderLineInSVG = (
  svg: SVGSVGElement,
  p0: Point,
  p1: Point,
  config?: ShapeStyleConfigState,
  id?: string
): void => {
  svg.appendChild(makeSVGLine(p0, p1, config, id));
};

const makePointsString = (acc: string, p: Point): string => {
  return `${acc}${p.x},${p.y} `;
};

export const cleanupPolygonFeedbackInSVG = (svg: SVGSVGElement): void => {
  const el = document.querySelector(`#${POLYGON_FEEDBACK_ID}`);
  if (el) {
    svg.removeChild(el);
  }
};

const updateSVGPolygonElement = (
  el: SVGPolygonElement,
  points: Point[],
  config: ShapeStyleConfigState
): void => {
  el.setAttribute('points', points.reduce(makePointsString, ''));
  setStyleAttributes(el, config);
};

const makeSVGPolygon = (
  points: Point[],
  config: ShapeStyleConfigState,
  id: string
): SVGPolygonElement => {
  const el = document.createElementNS(NAMESPACE_URI, 'polygon');
  el.setAttribute('id', id);
  updateSVGPolygonElement(el, points, config);
  return el;
};

export const renderPolygonInSVG = (
  svg: SVGSVGElement,
  points: Point[],
  config: ShapeStyleConfigState,
  id: string
): void => {
  svg.appendChild(makeSVGPolygon(points, config, id));
};

const updatePolygonInSVG = (
  el: SVGPolygonElement,
  points: Point[],
  config: ShapeStyleConfigState
): void => {
  updateSVGPolygonElement(el, points, config);
};

export const renderPolygonFeedbackInSVG = (
  svg: SVGSVGElement,
  points: Point[],
  config: ShapeStyleConfigState
): void => {
  const el = document.querySelector(`#${POLYGON_FEEDBACK_ID}`);
  if (el) {
    updatePolygonInSVG(el as SVGPolygonElement, points, config);
  } else {
    renderPolygonInSVG(svg, points, config, POLYGON_FEEDBACK_ID);
  }
};
