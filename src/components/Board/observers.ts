import {
  renderLineFeedbackInSVG,
  renderSecondLineFeedbackInSVG,
  renderThirdLineFeedbackInSVG,
} from './renderers';
import { Point } from './shapes';
import { ShapeStyleConfigState, DashArray } from '../ShapeStyleConfig/types';
import { pointFromEvent } from './utils';

export const makeObserver = (
  svg: SVGSVGElement,
  clicks: Point[],
  config: ShapeStyleConfigState
) => {
  //
  return (event: MouseEvent): void => {
    const feedbackConfig = {
      ...config,
      'stroke-dasharray': DashArray.Four,
    };
    if (svg) {
      switch (clicks.length) {
        case 0: {
          break;
        }
        case 1: {
          const p0 = clicks[0];
          const p1 = pointFromEvent(event);
          renderLineFeedbackInSVG(svg, p0, p1, feedbackConfig);
          break;
        }
        case 2: {
          const p0 = clicks[0];
          const p1 = clicks[1];
          const p2 = pointFromEvent(event);
          renderSecondLineFeedbackInSVG(svg, p0, p2, feedbackConfig);
          renderThirdLineFeedbackInSVG(svg, p1, p2, feedbackConfig);
          break;
        }
        default: {
          throw new Error('ASSERT: clicked points can be one of: 0, 1, 2');
        }
      }
    }
  };
};
