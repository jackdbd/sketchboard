import React, { useEffect, useRef } from 'react';

import { useSharedState } from '../../hooks';
import {
  boardSubject$,
  makeObservableOfCircles,
  makeObservableOfTriangles,
} from './observables';
import { renderCircleInSVG, renderTriangleInSVG } from './renderers';
import { Circle, Triangle } from './shapes';
import { coordinatesFromEvent } from './utils';
import { shapePickerSubject$, ShapeOption } from '../Sidebar';

import styles from './styles.module.css';
import { Subscription } from 'rxjs';

export const DIV_CONTAINER_TEST_ID = 'board-container-test-id';
export const SVG_BOARD_TEST_ID = 'board-svg-test-id';

const REF_NOT_READY = 'ASSERT: ref NOT ready!';

export const Board: React.FC<{}> = () => {
  const [state, setSharedState] = useSharedState(boardSubject$);
  const [{ shape }] = useSharedState(shapePickerSubject$);

  const refDiv = useRef<HTMLDivElement>(null);
  const refSvg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!refDiv.current) {
      throw new Error(REF_NOT_READY);
    }

    if (!refSvg.current) {
      throw new Error(REF_NOT_READY);
    }

    let subscription: Subscription;
    switch (shape) {
      case ShapeOption.Circle: {
        const observable$ = makeObservableOfCircles(refDiv.current);
        const observer = (circle: Circle): void => {
          if (refSvg.current) {
            renderCircleInSVG(refSvg.current, circle);
          }
          setSharedState({
            ...state,
            circlesDrawn: state.circlesDrawn + 1,
            clickCount: state.clickCount + 2,
          });
        };

        subscription = observable$.subscribe(observer);
        break;
      }

      case ShapeOption.Triangle: {
        const observable$ = makeObservableOfTriangles(refDiv.current);
        const observer = (triangle: Triangle): void => {
          if (refSvg.current) {
            renderTriangleInSVG(refSvg.current, triangle);
          }
          setSharedState({
            ...state,
            clickCount: state.clickCount + 3,
            trianglesDrawn: state.trianglesDrawn + 1,
          });
        };

        subscription = observable$.subscribe(observer);
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
    };
  }, [setSharedState, shape, state]);

  const onClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const [x, y] = coordinatesFromEvent(event);
    console.log('onClick', x, y);
  };

  return (
    <div
      className={styles.board}
      data-testid={DIV_CONTAINER_TEST_ID}
      onClick={onClick}
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
