import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { App } from './App';
import {
  DIV_CONTAINER_TEST_ID as BOARD_DIV,
  SVG_BOARD_TEST_ID as BOARD_SVG,
} from '../Board';
import { DIV_CONTAINER_TEST_ID as ERROR_DIV } from '../ErrorBoundary';
import { SHAPE_SELECT_TEST_ID, ShapeOption } from '../Sidebar';

describe('App', () => {
  it('renders one svg polygon in the board with three clicks (when the selected shape is "Triangle")', () => {
    const { getByTestId } = render(<App />);
    const div = getByTestId(BOARD_DIV);
    const svg = getByTestId(BOARD_SVG);

    fireEvent.change(getByTestId(SHAPE_SELECT_TEST_ID), {
      target: { value: ShapeOption.Triangle },
    });

    fireEvent.click(div, { clientX: 10, clientY: 10 });
    fireEvent.click(div, { clientX: 50, clientY: 10 });
    fireEvent.click(div, { clientX: 30, clientY: 30 });

    expect(svg.firstChild).not.toBeNull();
    if (svg.firstChild) {
      expect(svg.firstChild.nodeName).toBe('polygon');
    }
  });

  it('throws when the selected shape is "Bezier Curve" (not yet implemented) but it is catched by an error boundary', () => {
    const { getByTestId } = render(<App />);

    fireEvent.change(getByTestId(SHAPE_SELECT_TEST_ID), {
      target: { value: ShapeOption.BezierCurve },
    });

    expect(getByTestId(ERROR_DIV)).toBeInTheDocument();
  });
});
