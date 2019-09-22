import { Circle, Point, Triangle } from '../shapes';
import { ShapeStyleConfigState } from '../../ShapeStyleConfig/types';
import { initialState as initialShapeStyleConfigState } from '../../ShapeStyleConfig/observables';

const NAMESPACE_URI = 'http://www.w3.org/2000/svg';

const CIRCLE_FEEDBACK_ID = 'circle-feedback';
const LINE_0_FEEDBACK_ID = 'line-0-feedback';
const LINE_1_FEEDBACK_ID = 'line-1-feedback';
const LINE_2_FEEDBACK_ID = 'line-2-feedback';

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

const updateLineInSVG = (
  el: SVGLineElement,
  p0: Point,
  p1: Point,
  config?: ShapeStyleConfigState
): void => {
  el.setAttribute('x1', `${p0.x}`);
  el.setAttribute('y1', `${p0.y}`);
  el.setAttribute('x2', `${p1.x}`);
  el.setAttribute('y2', `${p1.y}`);
  setStyleAttributes(el, config);
};

export const renderLineFeedbackInSVG = (
  svg: SVGSVGElement,
  p0: Point,
  p1: Point,
  config?: ShapeStyleConfigState
): void => {
  const el = document.querySelector(`#${LINE_0_FEEDBACK_ID}`);
  if (el) {
    updateLineInSVG(el as SVGLineElement, p0, p1, config);
  } else {
    renderLineInSVG(svg, p0, p1, config, LINE_0_FEEDBACK_ID);
  }
};

export const renderSecondLineFeedbackInSVG = (
  svg: SVGSVGElement,
  p0: Point,
  p1: Point,
  config?: ShapeStyleConfigState
): void => {
  const el = document.querySelector(`#${LINE_1_FEEDBACK_ID}`);
  if (el) {
    updateLineInSVG(el as SVGLineElement, p0, p1, config);
  } else {
    renderLineInSVG(svg, p0, p1, config, LINE_1_FEEDBACK_ID);
  }
};

export const renderThirdLineFeedbackInSVG = (
  svg: SVGSVGElement,
  p0: Point,
  p1: Point,
  config?: ShapeStyleConfigState
): void => {
  const el = document.querySelector(`#${LINE_2_FEEDBACK_ID}`);
  if (el) {
    updateLineInSVG(el as SVGLineElement, p0, p1, config);
  } else {
    renderLineInSVG(svg, p0, p1, config, LINE_2_FEEDBACK_ID);
  }
};

export const cleanupTriangleFeedbackInSVG = (svg: SVGSVGElement): void => {
  const el0 = document.querySelector(`#${LINE_0_FEEDBACK_ID}`);
  if (el0) {
    svg.removeChild(el0);
  }
  const el1 = document.querySelector(`#${LINE_1_FEEDBACK_ID}`);
  if (el1) {
    svg.removeChild(el1);
  }
  const el2 = document.querySelector(`#${LINE_2_FEEDBACK_ID}`);
  if (el2) {
    svg.removeChild(el2);
  }
};
