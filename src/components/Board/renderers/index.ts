import { Circle, Triangle } from '../shapes';
import { ShapeStyleConfigState } from '../../ShapeStyleConfig/types';
import { initialState as initialShapeStyleConfigState } from '../../ShapeStyleConfig/observables';

const NAMESPACE_URI = 'http://www.w3.org/2000/svg';

const CIRCLE_FEEDBACK_ID = 'circle-feedback';

const setStyleAttributes = <T extends SVGElement>(
  el: T,
  config: ShapeStyleConfigState = initialShapeStyleConfigState
): T => {
  el.setAttribute('fill', config.fill || '');
  el.setAttribute('opacity', config.opacity || '');
  el.setAttribute('stroke', config.stroke || '');
  el.setAttribute('stroke-dasharray', config['stroke-dasharray'] || '');
  el.setAttribute('stroke-opacity', config['stroke-opacity'] || '');
  el.setAttribute('stroke-width', config['stroke-width'] || '');
  return el;
};

const makeSVGCircle = (
  c: Circle,
  config?: ShapeStyleConfigState,
  id?: string
): SVGCircleElement => {
  let circle = document.createElementNS(NAMESPACE_URI, 'circle');
  circle.setAttribute('cx', `${c.cx}`);
  circle.setAttribute('cy', `${c.cy}`);
  circle.setAttribute('r', `${c.r}`);
  circle = setStyleAttributes(circle, config);
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
  el = setStyleAttributes(el, config);
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
  let polygon = document.createElementNS(NAMESPACE_URI, 'polygon');
  polygon.setAttribute(
    'points',
    `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y}`
  );
  polygon = setStyleAttributes(polygon, config);
  return polygon;
};

export const renderTriangleInSVG = (
  svg: SVGSVGElement,
  triangle: Triangle,
  config?: ShapeStyleConfigState
): void => {
  svg.appendChild(makeSVGTriangle(triangle, config));
};
