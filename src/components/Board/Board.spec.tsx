import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Board, DIV_CONTAINER_TEST_ID, SVG_BOARD_TEST_ID } from './Board';

describe('Board', () => {
  it('has a svg whose width and height are responsive', () => {
    const { getByTestId } = render(<Board />);
    const svg = getByTestId(SVG_BOARD_TEST_ID);
    expect(svg.getAttribute('width')).toBe('100%');
    expect(svg.getAttribute('height')).toBe('100%');
  });

  it('can be clicked (TODO: re-render, wait for click to take effect?)', () => {
    const { getByTestId } = render(<Board />);
    const el = getByTestId(DIV_CONTAINER_TEST_ID);
    fireEvent(el, new MouseEvent('click'));
  });

  it('starts with an empty svg', () => {
    const { getByTestId } = render(<Board />);
    const svg = getByTestId(SVG_BOARD_TEST_ID);
    expect(svg.children).toHaveLength(0);
  });

  it('renders one svg circle with two clicks (the default shape is "Circle")', () => {
    const { getByTestId } = render(<Board />);
    const div = getByTestId(DIV_CONTAINER_TEST_ID);
    const svg = getByTestId(SVG_BOARD_TEST_ID);

    fireEvent.click(div, { clientX: 10, clientY: 20 });
    fireEvent.click(div, { clientX: 20, clientY: 30 });

    expect(svg.firstChild!.nodeName).toBe('circle');
  });
});
