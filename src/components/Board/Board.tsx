import React, { useEffect, useRef } from 'react';
import { Subscription } from 'rxjs';

import { useSharedState } from '../../hooks';
import {
  boardSubject$,
  makeObservableOfCircles,
  makeObservableOfTriangles,
  makeObservableOfMouseMoveEventsOnDiv,
  makeObservableOfClickEventsOnDiv,
} from './observables';
import {
  renderCircleInSVG,
  renderCircleFeedbackInSVG,
  renderTriangleInSVG,
  cleanupCircleFeedbackInSVG,
  //   renderLineFeedbackInSVG,
  //   renderSecondLineFeedbackInSVG,
  //   renderThirdLineFeedbackInSVG,
  cleanupTriangleFeedbackInSVG,
} from './renderers';
import { Circle, Point, Triangle } from './shapes';
import { euclideanDistance, pointFromEvent } from './utils';
import { shapePickerSubject$, ShapeOption } from '../ShapeSelect';
import { shapeStyleConfigSubject$ } from '../ShapeStyleConfig/observables';

import styles from './styles.module.css';
import { makeObserver } from './observers';

export const DIV_CONTAINER_TEST_ID = 'board-container-test-id';
export const SVG_BOARD_TEST_ID = 'board-svg-test-id';

const REF_NOT_READY = 'ASSERT: ref NOT ready!';

export const Board: React.FC<{}> = () => {
  const [state, setSharedState] = useSharedState(boardSubject$);
  const [{ shape }] = useSharedState(shapePickerSubject$);
  const [shapeStyleConfig] = useSharedState(shapeStyleConfigSubject$);

  const refDiv = useRef<HTMLDivElement>(null);
  const refSvg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const clickedPoints: Point[] = [];

    if (!refDiv.current) {
      throw new Error(REF_NOT_READY);
    }

    if (!refSvg.current) {
      throw new Error(REF_NOT_READY);
    }

    const obs$ = makeObservableOfClickEventsOnDiv(refDiv.current);
    const obs = (event: MouseEvent): void => {
      clickedPoints.push(pointFromEvent(event));
    };
    const sub = obs$.subscribe(obs);

    let subscription: Subscription;
    let subFeedback: Subscription;
    switch (shape) {
      case ShapeOption.Circle: {
        const obsFeedback$ = makeObservableOfMouseMoveEventsOnDiv(
          refDiv.current
        );
        const observerFeedback = (event: MouseEvent): void => {
          if (refSvg.current && clickedPoints.length) {
            const p0 = clickedPoints[0];
            const p1 = pointFromEvent(event);
            const r = euclideanDistance([p0.x, p0.y], [p1.x, p1.y]);
            const feedbackCircle = {
              cx: p0.x,
              cy: p0.y,
              r,
            };
            renderCircleFeedbackInSVG(refSvg.current, feedbackCircle, {
              fill: 'none',
              opacity: '0.5',
              stroke: shapeStyleConfig.stroke,
              'stroke-dasharray': shapeStyleConfig['stroke-dasharray'],
            });
          }
        };
        const observable$ = makeObservableOfCircles(refDiv.current);
        const observer = (circle: Circle): void => {
          if (refSvg.current) {
            renderCircleInSVG(refSvg.current, circle, shapeStyleConfig);
            cleanupCircleFeedbackInSVG(refSvg.current);
          }
          setSharedState({
            ...state,
            circlesDrawn: state.circlesDrawn + 1,
            clickCount: state.clickCount + 2,
            lastClick: [circle.cx, circle.cy],
          });
        };

        subscription = observable$.subscribe(observer);
        subFeedback = obsFeedback$.subscribe(observerFeedback);
        break;
      }

      case ShapeOption.Triangle: {
        const obsFeedback$ = makeObservableOfMouseMoveEventsOnDiv(
          refDiv.current
        );
        // let observerFeedback: Observer<MouseEvent>;
        let observerFeedback: (event: MouseEvent) => void;
        if (refSvg.current) {
          observerFeedback = makeObserver(
            refSvg.current,
            clickedPoints,
            shapeStyleConfig
          );
        } else {
          observerFeedback = (): void => {};
        }

        const observable$ = makeObservableOfTriangles(refDiv.current);
        const observer = (triangle: Triangle): void => {
          if (refSvg.current) {
            renderTriangleInSVG(refSvg.current, triangle, shapeStyleConfig);
            cleanupTriangleFeedbackInSVG(refSvg.current);
          }
          setSharedState({
            ...state,
            clickCount: state.clickCount + 3,
            trianglesDrawn: state.trianglesDrawn + 1,
          });
        };

        subscription = observable$.subscribe(observer);
        subFeedback = obsFeedback$.subscribe(observerFeedback);
        break;
      }

      default:
        const msg = `TODO: ${shape} not yet implemented`;
        throw new Error(msg);
    }

    return (): void => {
      if (subscription) {
        subscription.unsubscribe();
      }
      if (subFeedback) {
        subFeedback.unsubscribe();
      }
      sub.unsubscribe();
    };
  }, [setSharedState, shape, shapeStyleConfig, state]);

  return (
    <div
      className={styles.board}
      data-testid={DIV_CONTAINER_TEST_ID}
      ref={refDiv}
    >
      <svg
        data-testid={SVG_BOARD_TEST_ID}
        height="100%"
        preserveAspectRatio={'xMinYMin meet'}
        ref={refSvg}
        width="100%"
      />
    </div>
  );
};
