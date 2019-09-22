import { PartialObserver } from 'rxjs';

import {
  renderPolygonFeedbackInSVG,
  renderCircleFeedbackInSVG,
  cleanupPolygonFeedbackInSVG,
  cleanupCircleFeedbackInSVG,
} from './renderers';
import { Point } from './shapes';
import { ShapeStyleConfigState, DashArray } from '../ShapeStyleConfig/types';
import { pointFromEvent, euclideanDistance } from './utils';

export const makeObserverFeedbackPolygon = (
  svg: SVGSVGElement,
  clicks: Point[],
  config: ShapeStyleConfigState
): PartialObserver<MouseEvent> => {
  const feedbackConfig = {
    ...config,
    'stroke-dasharray': DashArray.Four,
  };
  return {
    complete: (): void => {
      cleanupPolygonFeedbackInSVG(svg);
    },

    next: (event: MouseEvent): void => {
      const points = [...clicks, pointFromEvent(event)];
      renderPolygonFeedbackInSVG(svg, points, feedbackConfig);
    },
  };
};

export const makeObserverFeedbackCirle = (
  svg: SVGSVGElement,
  clicks: Point[],
  config: ShapeStyleConfigState
): PartialObserver<MouseEvent> => {
  const feedbackConfig = {
    ...config,
    'stroke-dasharray': DashArray.Four,
  };
  return {
    complete: (): void => {
      cleanupCircleFeedbackInSVG(svg);
    },

    next: (event: MouseEvent): void => {
      if (clicks.length) {
        const points = [...clicks, pointFromEvent(event)];
        const [p0, p1] = points;
        const r = euclideanDistance([p0.x, p0.y], [p1.x, p1.y]);
        const circle = {
          cx: p0.x,
          cy: p0.y,
          r,
        };
        renderCircleFeedbackInSVG(svg, circle, feedbackConfig);
      }
    },
  };
};
