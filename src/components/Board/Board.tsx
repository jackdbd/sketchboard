import React, { useEffect, useRef } from 'react';
import { Subscription } from 'rxjs';

import { useSharedState } from '../../hooks';
import {
  boardSubject$,
  makeObservableOfCircleFeedback,
  makeObservableOfCircles,
  makeObservableOfTriangles,
  makeObservableOfTriangleFeedback,
  makeObservableOfMouseEventOnTarget,
} from './observables';
import {
  makeObserverFeedbackCirle,
  makeObserverFeedbackPolygon,
} from './observers';
import { renderCircleInSVG, renderTriangleInSVG } from './renderers';
import { Circle, Point, Triangle } from './shapes';
import { pointFromEvent } from './utils';
import { shapePickerSubject$, ShapeOption } from '../ShapeSelect';
import { shapeStyleConfigSubject$ } from '../ShapeStyleConfig/observables';

import styles from './styles.module.css';

export const DIV_CONTAINER_TEST_ID = 'board-container-test-id';
export const SVG_BOARD_TEST_ID = 'board-svg-test-id';

const REF_NOT_READY = 'ASSERT: ref NOT ready!';

const DEBUG = false;
// const DEBUG = true;

export const Board: React.FC<{}> = () => {
  const [state, setSharedState] = useSharedState(boardSubject$);
  const [{ shape }] = useSharedState(shapePickerSubject$);
  const [shapeStyleConfig] = useSharedState(shapeStyleConfigSubject$);

  const refDiv = useRef<HTMLDivElement>(null);
  const refSvg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!refSvg.current) {
      throw new Error(REF_NOT_READY);
    }

    // --- Observables from simple mouse events ($) --- //
    const click$ = makeObservableOfMouseEventOnTarget(refSvg.current, 'click');
    const mousedown$ = makeObservableOfMouseEventOnTarget(
      refSvg.current,
      'mousedown'
    );
    const mousemove$ = makeObservableOfMouseEventOnTarget(
      refSvg.current,
      'mousemove'
    );

    /**
     * Keep track of all click events until the dependencies of this React
     * `useEffect` hook trigger a re-run of this side-effect.
     */
    const clickedPoints: Point[] = [];
    const clickObserver = (event: MouseEvent): void => {
      clickedPoints.push(pointFromEvent(event));
    };
    const clickSub = click$.subscribe(clickObserver);

    /**
     * Create a subscription for each visual feedback when drawing a shape.
     * Every time a new user interaction contributes to the definition of a
     * shape (e.g. the 1st/2nd/3rd click when drawing a triangle), this
     * component re-renders this visual aid (it does NOT update the state, but
     * it does depend on the state).
     */
    let sub: Subscription;
    switch (shape) {
      case ShapeOption.Circle: {
        const feedback$ = makeObservableOfCircleFeedback(
          click$,
          mousedown$,
          mousemove$,
          DEBUG
        );
        const observer = makeObserverFeedbackCirle(
          refSvg.current,
          clickedPoints,
          shapeStyleConfig
        );
        sub = feedback$.subscribe(observer);
        break;
      }

      case ShapeOption.Triangle: {
        const feedback$ = makeObservableOfTriangleFeedback(
          click$,
          mousedown$,
          mousemove$,
          DEBUG
        );
        const observer = makeObserverFeedbackPolygon(
          refSvg.current,
          clickedPoints,
          shapeStyleConfig
        );
        sub = feedback$.subscribe(observer);
        break;
      }

      default:
        const msg = `TODO: ${shape} not yet implemented`;
        throw new Error(msg);
    }

    // Cleanup subscriptions so we don't introduce memory leaks.
    // https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1
    return function cleanup(): void {
      clickSub.unsubscribe();
      if (sub) {
        sub.unsubscribe();
      }
    };

    /*
     * This side-effect hook needs to re-run every time a new triangle is drawn
     * because we need to call the observable's factory
     * `makeObservableOfTriangleFeedback`, so that factory can create once again
     * an observable that completes after 3 click events on the SVG board (we
     * want an observable that completes so we can ckeanup the SVG board in the
     * observer subscribed to this observable).
     */
  }, [
    refSvg,
    shape,
    shapeStyleConfig,
    state.circlesDrawn,
    state.trianglesDrawn,
  ]);

  useEffect(() => {
    if (!refSvg.current) {
      throw new Error(REF_NOT_READY);
    }

    const click$ = makeObservableOfMouseEventOnTarget(refSvg.current, 'click');

    /**
     * Create a subscription for each shape.
     * Every time a new shape is created by the user, this component re-renders
     * the shape and updates the state.
     */
    let sub: Subscription;
    switch (shape) {
      case ShapeOption.Circle: {
        const circle$ = makeObservableOfCircles(click$);
        const observer = (circle: Circle): void => {
          if (refSvg.current) {
            renderCircleInSVG(refSvg.current, circle, shapeStyleConfig);
          }
          setSharedState({
            ...state,
            circlesDrawn: state.circlesDrawn + 1,
            clickCount: state.clickCount + 2,
            lastClick: [circle.cx, circle.cy],
          });
        };

        sub = circle$.subscribe(observer);
        break;
      }

      case ShapeOption.Triangle: {
        const triangle$ = makeObservableOfTriangles(click$);
        const observer = (triangle: Triangle): void => {
          if (refSvg.current) {
            renderTriangleInSVG(refSvg.current, triangle, shapeStyleConfig);
          }
          setSharedState({
            ...state,
            clickCount: state.clickCount + 3,
            trianglesDrawn: state.trianglesDrawn + 1,
          });
        };

        sub = triangle$.subscribe(observer);
        break;
      }

      default:
        const msg = `TODO: ${shape} not yet implemented`;
        throw new Error(msg);
    }

    return (): void => {
      if (sub) {
        sub.unsubscribe();
      }
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
