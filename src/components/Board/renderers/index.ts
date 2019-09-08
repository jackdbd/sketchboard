import { Circle, Triangle } from '../shapes';
import { ShapeStyleConfigState } from '../../ShapeStyleConfig/types';
import { initialState as initialShapeStyleConfigState } from '../../ShapeStyleConfig/observables';

const NAMESPACE_URI = 'http://www.w3.org/2000/svg';

const setStyleAttributes = <T extends SVGElement>(
  el: T,
  config: ShapeStyleConfigState = initialShapeStyleConfigState
): T => {
  el.setAttribute('fill', config.fill || '');
  el.setAttribute('stroke', config.stroke || '');
  el.setAttribute('stroke-dasharray', config['stroke-dasharray'] || '');
  el.setAttribute('stroke-opacity', config['stroke-opacity'] || '');
  el.setAttribute('stroke-width', config['stroke-width'] || '');
  return el;
};

const makeSVGCircle = (
  c: Circle,
  config?: ShapeStyleConfigState
): SVGCircleElement => {
  let circle = document.createElementNS(NAMESPACE_URI, 'circle');
  circle.setAttribute('cx', `${c.cx}`);
  circle.setAttribute('cy', `${c.cy}`);
  circle.setAttribute('r', `${c.r}`);
  circle = setStyleAttributes(circle, config);
  return circle;
};

export const renderCircleInSVG = (
  svg: SVGSVGElement,
  circle: Circle,
  config?: ShapeStyleConfigState
): void => {
  svg.appendChild(makeSVGCircle(circle, config));
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
