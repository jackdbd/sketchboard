import { Circle, Triangle } from '../shapes';

const NAMESPACE_URI = 'http://www.w3.org/2000/svg';

const makeSVGCircle = (c: Circle): SVGCircleElement => {
  const circle = document.createElementNS(NAMESPACE_URI, 'circle');
  circle.setAttribute('cx', `${c.cx}`);
  circle.setAttribute('cy', `${c.cy}`);
  circle.setAttribute('r', `${c.r}`);
  circle.setAttribute('fill', 'red');
  circle.setAttribute('stroke', 'black');
  circle.setAttribute('stroke-width', '20px');
  circle.setAttribute('stroke-opacity', '0.5');
  return circle;
};

export const renderCircleInSVG = (svg: SVGSVGElement, circle: Circle): void => {
  svg.appendChild(makeSVGCircle(circle));
};

const makeSVGTriangle = (triangle: Triangle): SVGPolygonElement => {
  const { p0, p1, p2 } = triangle;
  const polygon = document.createElementNS(NAMESPACE_URI, 'polygon');
  polygon.setAttribute(
    'points',
    `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y}`
  );
  polygon.setAttribute('fill', 'green');
  polygon.setAttribute('stroke', 'orange');
  polygon.setAttribute('stroke-width', '20px');
  polygon.setAttribute('stroke-opacity', '0.5');
  return polygon;
};

export const renderTriangleInSVG = (
  svg: SVGSVGElement,
  triangle: Triangle
): void => {
  svg.appendChild(makeSVGTriangle(triangle));
};
