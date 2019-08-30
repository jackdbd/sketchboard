import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { App } from './App';
import { SHAPE_SELECT_TEST_ID, ShapeOption } from '../Sidebar';
import { DIV_CONTAINER_TEST_ID, SVG_BOARD_TEST_ID } from '../Board';

describe('App', () => {
  it('renders one svg polygon in the board with three clicks (when the selected shape is "Triangle")', () => {
    const { getByTestId } = render(<App />);
    const div = getByTestId(DIV_CONTAINER_TEST_ID);
    const svg = getByTestId(SVG_BOARD_TEST_ID);

    fireEvent.change(getByTestId(SHAPE_SELECT_TEST_ID), {
      target: { value: ShapeOption.Triangle },
    });

    fireEvent.click(div, { clientX: 10, clientY: 10 });
    fireEvent.click(div, { clientX: 50, clientY: 10 });
    fireEvent.click(div, { clientX: 30, clientY: 30 });

    expect(svg.firstChild!.nodeName).toBe('polygon');
  });

  it('throws when the selected shape is "Bezier Curve" (not yet implemented)', () => {
    const { getByTestId } = render(<App />);

    expect(() => {
      fireEvent.change(getByTestId(SHAPE_SELECT_TEST_ID), {
        target: { value: ShapeOption.BezierCurve },
      });
    }).toThrow();
  });
});
